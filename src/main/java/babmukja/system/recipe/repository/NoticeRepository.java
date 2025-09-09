package babmukja.system.recipe.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.dto.NoticeResponseDTO;
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

    public List<NoticeResponseDTO> noticeList() {
        QNotice notice = QNotice.notice;
        return queryFactory
                .select(Projections.constructor(NoticeResponseDTO.class, 
                    notice.idx,
                    notice.title,
                    notice.writer,
                    notice.content,
                    notice.regdate,
                    notice.viewcount
                )).from(notice).orderBy(notice.idx.desc()).fetch();
    }
}
