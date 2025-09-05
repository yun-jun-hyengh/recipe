package babmukja.system.recipe.repository;

import java.time.LocalDateTime;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.entity.QCustomer;

@Repository
public class CustomerRepository {
    
    private final EntityManager em;
    
    private final JPAQueryFactory queryFactory;
    //
    public CustomerRepository(EntityManager em, JPAQueryFactory queryFactory) {
        this.em = em;
        this.queryFactory = queryFactory;
    }

    @Transactional
    public void save(Customer customer) {
        em.persist(customer);
    }

    public boolean existsByUserId(String user_id) {
        Integer fetchOne = queryFactory.selectOne()
                .from(QCustomer.customer)
                .where(QCustomer.customer.user_id.eq(user_id))
                .fetchFirst();
        return fetchOne != null;
    }

    public String findUserIdByNameAndEmail(String user_name, String user_email) {
        QCustomer customer = QCustomer.customer;

        return queryFactory
                .select(customer.user_id)
                .from(customer)
                .where(customer.user_name.eq(user_name).and(customer.user_email.eq(user_email))).fetchOne();
    }

    public Customer findById(String user_id) {
        QCustomer cust = QCustomer.customer;
        String searchId = user_id;
        return queryFactory.selectFrom(cust)
            .where(cust.user_id.eq(searchId)).fetchOne();
    }

    public Customer findByRefreshToken(String refresh_token) {
        QCustomer c = QCustomer.customer;
        return queryFactory.selectFrom(c).where(c.refresh_token.eq(refresh_token)).fetchOne();
    }

    @Transactional
    public long updateRefreshToken(String user_id, String refresh_token, LocalDateTime refresh_token_expiry) {
        QCustomer cust = QCustomer.customer;
        return queryFactory.update(cust)
                .set(cust.refresh_token, refresh_token)
                .set(cust.refresh_token_expiry, refresh_token_expiry)
                .where(cust.user_id.eq(user_id)).execute();
    }
}
