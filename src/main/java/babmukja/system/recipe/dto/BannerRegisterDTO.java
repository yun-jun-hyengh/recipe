package babmukja.system.recipe.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BannerRegisterDTO {
    private MultipartFile ba_img;
    private String ba_descript;
    private Long ba_use;
}
