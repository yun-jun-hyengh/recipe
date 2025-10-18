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
    private String filename;
    private String filepath;

    public NoticeResponseDTO(Long idx, String writer, String title, String content, String regdate, Long viewcount, String filename, String filepath) {
        this.idx = idx;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.regdate = regdate;
        this.viewcount = viewcount;
        this.filename = filename;
        this.filepath = filepath;
    }
}
