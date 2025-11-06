package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeReplyPageDTO {
    private Long idx;
    private int page;
    private int size = 5;
}
