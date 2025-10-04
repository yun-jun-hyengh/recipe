package babmukja.system.recipe.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PopupRegisterDTO {
    private String title;
    private String content;
    private String start_date;
    private String end_date;
    private MultipartFile popup_filename;
    private Long is_active; // 사용 미사용
}
