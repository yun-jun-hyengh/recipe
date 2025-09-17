package babmukja.system.recipe.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.entity.QCustomer;
import babmukja.system.recipe.entity.QRecipe;

@Repository
public class AdminRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public AdminRepository(EntityManager em, JPAQueryFactory queryFactory) {
        this.em = em;
        this.queryFactory = queryFactory;
    }

    public List<Tuple> userList(CustomerSearchDTO dto) {
        QCustomer customer = QCustomer.customer;
        QRecipe recipe = QRecipe.recipe;

        NumberExpression<Long> inactiveCount = recipe.recipe_idx.count();

        StringExpression remainingInactive = 
            Expressions.stringTemplate(
                "concat({0}, '/', {1})", 
                Expressions.numberTemplate(Long.class, "{0} - {1}", customer.private_recipe_limit, inactiveCount),
                customer.private_recipe_limit
            );
        
        StringExpression unlimit_result = new CaseBuilder()
                        .when(customer.unlimit.eq(1L))
                        .then("무제한이용자")
                        .when(customer.unlimit.eq(0L))
                        .then("제한이용자").otherwise("").as("unlimit_result");
        
        StringExpression auth = new CaseBuilder()
                        .when(customer.adminchk.eq(1L))
                        .then("관리자")
                        .when(customer.adminchk.eq(0L))
                        .then("일반사용자").otherwise("").as("auth");

        return queryFactory
                .select(
                    customer.user_idx,
                    customer.user_id,
                    customer.user_name,
                    customer.user_phone,
                    customer.user_email,
                    customer.nickname,
                    customer.regdate,
                    customer.private_recipe_limit,
                    customer.unlimit,
                    customer.adminchk,
                    unlimit_result,
                    auth,
                    remainingInactive.as("remainingInactive")
                ).from(customer)
                .leftJoin(recipe).on(
                    recipe.user_idx.eq(customer.user_idx)
                    .and(recipe.is_public.eq(0L))
                )
                .where(dto.getUser_name() != null ? customer.user_name.contains(dto.getUser_name()) : null)
                .groupBy(
                    customer.user_idx,
                    customer.user_id,
                    customer.user_name,
                    customer.user_phone,
                    customer.user_email,
                    customer.nickname,
                    customer.regdate,
                    customer.private_recipe_limit,
                    customer.unlimit,
                    customer.adminchk
                ).offset(dto.getOffset()).limit(dto.getPageSize())
                .fetch();
    }

    public long countCustomer(CustomerSearchDTO dto) {
        QCustomer customer = QCustomer.customer;
        return queryFactory
                .select(customer.user_idx.count())
                .from(customer)
                .where(dto.getUser_name() != null ? customer.user_name.contains(dto.getUser_name()) : null).fetchOne();
    }

    // @SuppressWarnings("unchecked")
    public List<Map<String, Object>> findRecentUsers() {
        QCustomer customer = QCustomer.customer;
        String oneMonthAgo = LocalDate.now().minusMonths(1).toString();

        List<Tuple> result = queryFactory
            .select(customer.user_idx, customer.user_name, customer.user_phone, customer.user_email, customer.regdate)
            .from(customer)
            .where(customer.regdate.goe(oneMonthAgo))
            .orderBy(customer.regdate.desc()).limit(5).fetch();
        
        List<Map<String, Object>> list = new ArrayList<>();
        for(Tuple t : result) {
            Map<String, Object> map = new HashMap<>();
            map.put("user_idx", t.get(customer.user_idx));
            map.put("user_name", t.get(customer.user_name));
            map.put("user_phone", t.get(customer.user_phone));
            map.put("user_email", t.get(customer.user_email));
            map.put("regdate", t.get(customer.regdate));

            list.add(map);
        }
        // List<Map> result = queryFactory
        //         .select(Projections.fields(
        //             Map.class,
        //             customer.user_idx.as("user_idx"),
        //             customer.user_name.as("user_name"),
        //             customer.user_phone.as("user_phone"),
        //             customer.user_email.as("user_email"),
        //             customer.regdate.as("regdate")
        //         )).from(customer)
        //         .where(customer.regdate.goe(oneMonthAgo))
        //         .orderBy(customer.regdate.desc()).limit(5).fetch();
        return list;
    }
}
