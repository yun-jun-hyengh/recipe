package babmukja.system.recipe.controller;

import org.springframework.web.bind.annotation.RestController;
import babmukja.system.recipe.constants.CustomerParameterName;
import babmukja.system.recipe.dto.CustomerDTO;
import babmukja.system.recipe.dto.CustomerFindIdDTO;
import babmukja.system.recipe.dto.CustomerIdChkDTO;
import babmukja.system.recipe.dto.LoginRequestDTO;
import babmukja.system.recipe.dto.LoginResponseDTO;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.service.CustomerService;
import babmukja.system.recipe.utils.ResponseJsonUtils;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CustomerController {
    
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    @PostMapping(value = CustomerParameterName.JOIN, consumes = "application/json")
    public ResponseEntity<Map<String, Object>> createCust(@RequestBody CustomerDTO dto) {
        try {
            boolean success = customerService.join(dto);
            if(success) {
                return ResponseEntity.ok(ResponseJsonUtils.mapResponse("success", "회원가입 완료", null));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseJsonUtils.mapResponse("fail", "회원가입 실패", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseJsonUtils.mapResponse("error", "회원가입 중 오류 발생", e.getMessage()));
        }
    }

    @PostMapping(value = CustomerParameterName.OVERLAPID, consumes = "application/json")
    public ResponseEntity<Map<String, Object>> checkUserId(@RequestBody CustomerIdChkDTO dto) {
        boolean exists = customerService.checkUserIdDuplicate(dto.getUser_id());
        return ResponseEntity.ok(ResponseJsonUtils.mapResponse(
            "success", 
            exists ? "이미 존재하는 아이디입니다." : "사용 가능한 아이디입니다.", Map.of("user_id", dto.getUser_id(), "exists", exists)));
    }

    @PostMapping(value = CustomerParameterName.FINDID, consumes = "application/json")
    public ResponseEntity<Map<String, Object>> findUserId(@RequestBody CustomerFindIdDTO dto) {
        String user_id = customerService.findUserId(dto);
        if(user_id != null) {
            return ResponseEntity.ok(ResponseJsonUtils.mapResponse("success", dto.getUser_name() + "님의 아이디를 찾았습니다.", user_id));
        } else {
            return ResponseEntity.ok(ResponseJsonUtils.mapResponse("fail", "해당 정보와 일치하는 사용자가 없습니다.", null));
        }
    }

    @PostMapping(value = CustomerParameterName.LOGIN, consumes = "application/json")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return customerService.login(dto.getUser_id(), dto.getUser_pw());
    }

    @PostMapping(CustomerParameterName.REFRESH)
    public Map<String, String> refresh(@RequestParam String refreshToken) {
        // String newAccessToken = customerService.refreshAccessToken(refreshToken);
        // return Map.of("accessToken", newAccessToken);
        return customerService.refreshAccessToken(refreshToken);
    }
}
