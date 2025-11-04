package babmukja.system.recipe.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeUpdateDTO {
    private Long idx;
    private String title;
    private String content;
    private String writer;
    private String filename;
    private String filepath;
    private MultipartFile file;
}
