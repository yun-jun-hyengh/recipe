package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeSearchDTO {
    private String searchType;
    private String keyword;
    private int page = 1;
}
