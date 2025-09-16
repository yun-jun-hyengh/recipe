package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerSearchDTO { // 페이징 넣을것 
    private String user_name;
    private Integer page = 1;
    private Integer pageSize = 10;

    public int getOffset() {
        return (page - 1) * pageSize;
    }
}
