package babmukja.system.recipe.controller;

import org.springframework.web.bind.annotation.RestController;
import babmukja.system.recipe.constants.CustomerParameterName;
import babmukja.system.recipe.dto.CustomerDTO;
import babmukja.system.recipe.service.CustomerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class CustomerController {
    
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    @PostMapping(value = CustomerParameterName.JOIN, consumes = "application/json")
    public ResponseEntity<String> createCust(@RequestBody CustomerDTO dto) {
        try {
            boolean success = customerService.join(dto);
            if(success) {
                return ResponseEntity.ok("회원가입 완료");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("회원가입 중 오류 발생: " + e.getMessage());
        }
    }
}
