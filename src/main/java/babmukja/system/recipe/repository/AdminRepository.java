package babmukja.system.recipe.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import babmukja.system.recipe.dto.CustomerSearchDTO;
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
        
        // 해당 회원의 비공개 레시피 등록 개수 
        // NumberExpression<Long> inactiveCount = Expressions.numberTemplate(
        //         Long.class,
        //         "coalesce((select count(*) from recipe r where r.user_idx = {0} and r.is_public = 0), 0)",
        //         customer.user_idx
        // );

        // 잔여 비공개 레시피 등록 가능 수 / 최대 등록 가능 수 
        // StringExpression remainingInactive = Expressions.stringTemplate(
        //     "concat({0}, '/', {1})", 
        //     customer.private_recipe_limit.subtract(inactiveCount),
        //     customer.private_recipe_limit);

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
                    customer.unlimit
                )
                .fetch();
    }
}
