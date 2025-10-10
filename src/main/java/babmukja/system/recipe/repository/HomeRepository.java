package babmukja.system.recipe.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.entity.Banner;
import babmukja.system.recipe.entity.QBanner;

@Repository
public class HomeRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public HomeRepository(EntityManager em, JPAQueryFactory queryFactory) {
        this.em = em;
        this.queryFactory = queryFactory;
    }

    public List<Banner> findActiveBanners() {
        QBanner banner = QBanner.banner;
        return queryFactory.selectFrom(banner)
                .where(banner.ba_use.eq(1L))  // 엔티티 필드명 기준, ba_use X
                .orderBy(banner.ba_idx.asc()) // 엔티티 필드명 기준, ba_idx X
                .fetch();
    }
}
