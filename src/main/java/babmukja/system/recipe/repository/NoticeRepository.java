package babmukja.system.recipe.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.dto.NoticeResponseDTO;
import babmukja.system.recipe.dto.NoticeSearchDTO;
import babmukja.system.recipe.entity.Notice;
import babmukja.system.recipe.entity.QNotice;

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
}
