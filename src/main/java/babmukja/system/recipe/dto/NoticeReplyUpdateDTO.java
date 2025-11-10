package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeReplyUpdateDTO {
    private Long re_idx;
    private Long user_idx;
    private String re_content;
}
