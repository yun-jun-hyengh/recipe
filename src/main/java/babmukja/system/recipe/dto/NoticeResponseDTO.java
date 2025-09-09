package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeResponseDTO {
    private Long idx;
    private String writer;
    private String title;
    private String content;
    private String regdate;
    private Long viewcount;

    public NoticeResponseDTO(Long idx, String writer, String title, String content, String regdate, Long viewcount) {
        this.idx = idx;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.regdate = regdate;
        this.viewcount = viewcount;
    }
}
