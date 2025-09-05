package babmukja.system.recipe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {
    private String accessToken;
    private String refresh_token;
    private Long user_idx;
    private String user_name;
    private String nickname;
    private Long adminchk;

    public LoginResponseDTO(String accessToken, String refresh_token, 
                            Long user_idx, String user_name, String nickname, Long adminchk) {
        
        this.accessToken = accessToken;
        this.refresh_token = refresh_token;
        this.user_idx = user_idx;
        this.user_name = user_name;
        this.nickname = nickname;
        this.adminchk = adminchk;
    }
}
