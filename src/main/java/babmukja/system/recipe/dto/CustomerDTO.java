package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDTO {
    private String user_id;
    private String user_pw;
    private String user_name;
    private String nickname;
    private String user_email;
    private String user_phone;
    private Long adminchk;
    private String regdate;
    private Long private_recipe_limit;
    private Long unlimit;
}
