package babmukja.system.recipe.repository;

import javax.persistence.EntityManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import babmukja.system.recipe.entity.Customer;

@Repository
public class CustomerRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public CustomerRepository(EntityManager em, JPAQueryFactory queryFactory) {
        this.em = em;
        this.queryFactory = queryFactory;
    }

    @Transactional
    public void save(Customer customer) {
        em.persist(customer);
    }
}
