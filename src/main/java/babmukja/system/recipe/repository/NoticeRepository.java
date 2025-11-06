package babmukja.system.recipe.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.dto.NoticeReplyPageDTO;
import babmukja.system.recipe.dto.NoticeReplyRegisterDTO;
import babmukja.system.recipe.dto.NoticeResponseDTO;
import babmukja.system.recipe.dto.NoticeSearchDTO;
import babmukja.system.recipe.dto.NoticeUpdateDTO;
import babmukja.system.recipe.entity.Notice;
import babmukja.system.recipe.entity.NoticeReply;
import babmukja.system.recipe.entity.QNotice;
import babmukja.system.recipe.entity.QNoticeReply;
import babmukja.system.recipe.utils.DateUtils;

@Repository
public class NoticeRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public NoticeRepository(EntityManager em, JPAQueryFactory queryFactory) {
        this.em = em;
        this.queryFactory = queryFactory;
    }

    @Transactional
    public void save(Notice notice) {
        em.persist(notice);
    }

    public List<NoticeResponseDTO> noticeList(NoticeSearchDTO dto, long[] totalElementsHolder) {
        QNotice notice = QNotice.notice;
        BooleanBuilder builder = new BooleanBuilder();

        if(dto.getKeyword() != null && !dto.getKeyword().trim().isEmpty()) {
            String keyword = dto.getKeyword();
            switch(dto.getSearchType()) {
                case "title":
                    builder.and(notice.title.containsIgnoreCase(keyword));
                    break;
                case "writer":
                    builder.and(notice.writer.containsIgnoreCase(keyword));
                    break;
                case "both":
                    builder.and(
                        notice.title.containsIgnoreCase(keyword)
                        .or(notice.writer.containsIgnoreCase(keyword))
                    );
                    break;
            }
        }

        long total = queryFactory.select(notice.count())
                        .from(notice)
                        .where(builder).fetchOne();
        
        totalElementsHolder[0] = total;

        int pageSize = 10;
        int offset = (dto.getPage() - 1) * pageSize;

        return queryFactory
                .select(Projections.constructor(NoticeResponseDTO.class, 
                    notice.idx,
                    notice.writer,
                    notice.title,
                    notice.content,
                    notice.regdate,
                    notice.viewcount,
                    notice.filename,
                    notice.filepath
                )).from(notice).where(builder)
                .orderBy(notice.idx.desc()).offset(offset).limit(pageSize).fetch();
    }

    public Map<String, Object> findNoticeDetail(Long idx) {
        QNotice notice = QNotice.notice;

        Notice n = queryFactory.selectFrom(notice)
                    .where(notice.idx.eq(idx)).fetchFirst();
        
        Map<String, Object> map = new HashMap<>();
        map.put("idx", n.getIdx());
        map.put("writer", n.getWriter());
        map.put("title", n.getTitle());
        map.put("content", n.getContent());
        map.put("filename", n.getFilename());
        map.put("filepath", n.getFilepath());
        map.put("viewcount", n.getViewcount());
        map.put("regdate", n.getRegdate());

        return map;
    }

    public long deleteByNoticeIdx(Long idx) {
        QNotice notice = QNotice.notice;
        return queryFactory
                .delete(notice).where(notice.idx.eq(idx)).execute();
    }

    public String findNoticeImagePathByIdx(Long idx) {
        QNotice notice = QNotice.notice;
        return queryFactory
                .select(notice.filepath).from(notice).where(notice.idx.eq(idx))
                .fetchFirst();
    }

    public void increaseViewCount(Long idx) {
        QNotice notice = QNotice.notice;
        queryFactory
            .update(notice).set(notice.viewcount, notice.viewcount.coalesce(0L).add(1))
            .where(notice.idx.eq(idx)).execute();
    }

    public Map<String, Object> findPrevNext(Long idx) {
        QNotice notice = QNotice.notice;
        Map<String, Object> result = new HashMap<>();
        
        // 이전글
        var prev = queryFactory
                    .selectFrom(notice)
                    .where(notice.idx.gt(idx))
                    .orderBy(notice.idx.asc())
                    .limit(1).fetchOne();
        
        var next = queryFactory
                    .selectFrom(notice)
                    .where(notice.idx.lt(idx))
                    .orderBy(notice.idx.desc())
                    .limit(1).fetchOne();
        
        result.put("prev", prev != null ? Map.of(
            "idx", prev.getIdx(),
            "title", prev.getTitle(),
            "regdate", prev.getRegdate()
        ) : null);

        result.put("next", next != null ? Map.of(
            "idx", next.getIdx(),
            "title", next.getTitle(),
            "regdate", next.getRegdate()
        ) : null);
        return result;
    }

    public Map<String, Object> updateNotice(NoticeUpdateDTO dto) {
        QNotice notice = QNotice.notice;
        long updateRows = queryFactory
                            .update(notice)
                            .set(notice.title, dto.getTitle())
                            .set(notice.content, dto.getContent())
                            .set(notice.filename, dto.getFilename())
                            .set(notice.filepath, dto.getFilepath())
                            .where(notice.idx.eq(dto.getIdx())).execute();
        Map<String, Object> result = new HashMap<>();
        result.put("updateRows", updateRows);
        result.put("idx", dto.getIdx());
        return result;
    }

    @Transactional
    public void insertReply(NoticeReplyRegisterDTO dto) {
        NoticeReply comment = new NoticeReply();
        comment.setIdx(dto.getIdx());
        comment.setUser_idx(dto.getUser_idx());
        comment.setRe_writer(dto.getRe_writer());
        comment.setRe_content(dto.getRe_content());
        comment.setRe_regdate(DateUtils.getCurrentDate());
        em.persist(comment);
    }

    public Map<String, Object> findCommentsByNotice(NoticeReplyPageDTO dto) {
        QNoticeReply noticeReply = QNoticeReply.noticeReply;

        long totalCount = queryFactory
                            .select(noticeReply.count())
                            .where(noticeReply.idx.eq(dto.getIdx())).fetchOne();
        
        List<Map<String, Object>> comments = queryFactory
            .select(noticeReply.idx, noticeReply.re_idx, noticeReply.user_idx,
            noticeReply.re_writer, noticeReply.re_content, noticeReply.re_regdate)
            .from(noticeReply).where(noticeReply.idx.eq(dto.getIdx()))
            .orderBy(noticeReply.re_idx.desc())
            .offset((dto.getPage() - 1L) * dto.getSize())
            .limit(dto.getSize()).fetch()
            .stream()
            .map(tuple -> {
                Map<String, Object> map = new HashMap<>();
                map.put("idx", tuple.get(noticeReply.idx));
                map.put("re_idx", tuple.get(noticeReply.re_idx));
                map.put("user_idx", tuple.get(noticeReply.user_idx));
                map.put("re_writer", tuple.get(noticeReply.re_writer));
                map.put("re_content", tuple.get(noticeReply.re_content));
                map.put("re_regdate", tuple.get(noticeReply.re_regdate));
                return map;
            }).collect(Collectors.toList());
        
        int totalPages = (int) Math.ceil((double) totalCount / dto.getSize());

        Map<String, Object> result = new HashMap<>();
        result.put("comments", comments);
        result.put("totalElements", totalCount);
        result.put("currentPage", dto.getPage());
        result.put("totalPages", totalPages);
        return result;
    }
}
