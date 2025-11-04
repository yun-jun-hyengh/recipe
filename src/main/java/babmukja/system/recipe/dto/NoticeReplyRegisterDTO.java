package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeReplyRegisterDTO {
    private Long idx;
    private Long user_idx;
    private String re_writer;
    private String re_content;
}
