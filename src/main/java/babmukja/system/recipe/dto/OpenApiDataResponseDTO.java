package babmukja.system.recipe.dto;

import java.util.List;

import lombok.Data;

@Data
public class OpenApiDataResponseDTO {
    private int totalCount;
    private List<OpenApiDataDTO> rows;
}
