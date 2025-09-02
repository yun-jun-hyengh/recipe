package babmukja.system.recipe.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "customer")
public class Customer {

    @Id
    @Column(name = "user_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_idx;

    @Column(name = "user_id")
    private String user_id;

    @Column(name = "user_pw")
    private String user_pw;

    @Column(name = "user_name")
    private String user_name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "user_email")
    private String user_email;

    @Column(name = "user_phone")
    private String user_phone;

    @Column(name = "adminchk")
    private Long adminchk;

    @Column(name = "regdate")
    private String regdate;

    @Column(name = "private_recipe_limit")
    private Long private_recipe_limit = 50L;

    @Column(name = "unlimit")
    private Long unlimit = 0L; // 0 : 제한 1 : 제한없음
    
}
