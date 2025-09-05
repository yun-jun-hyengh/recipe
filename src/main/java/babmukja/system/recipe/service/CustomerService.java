package babmukja.system.recipe.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import babmukja.system.recipe.dto.CustomerDTO;
import babmukja.system.recipe.dto.CustomerFindIdDTO;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.exception.BizException;
import babmukja.system.recipe.repository.CustomerRepository;
import babmukja.system.recipe.utils.DateUtils;
import babmukja.system.recipe.utils.JwtUtil;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public boolean join(CustomerDTO dto) {
        try {
            Customer customer = new Customer();
            customer.setUser_id(dto.getUser_id());
            String encodedPassword = passwordEncoder.encode(dto.getUser_pw());
            customer.setUser_pw(encodedPassword);
            customer.setUser_name(dto.getUser_name());
            customer.setNickname(dto.getNickname());
            customer.setUser_email(dto.getUser_email());
            customer.setUser_phone(dto.getUser_phone());
            customer.setAdminchk(0L);
            customer.setRegdate(DateUtils.getCurrentDate());
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        
    }

    public boolean checkUserIdDuplicate(String userId) {
        return customerRepository.existsByUserId(userId);
    }
    
    public String findUserId(CustomerFindIdDTO dto) {
        return customerRepository.findUserIdByNameAndEmail(dto.getUser_name(), dto.getUser_email());
    }

    public Map<String, String> login(String user_id, String user_pw) {
        Customer customer = customerRepository.findById(user_id);
        if (customer == null) throw new RuntimeException("일치하는 해당 사용자가 없습니다.");

        if(!passwordEncoder.matches(user_pw, customer.getUser_pw()))
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        
        String accessToken = jwtUtil.generateAccessToken(user_id);
        String refreshToken = jwtUtil.generateRefreshToken(user_id);
        customer.setRefresh_token(refreshToken);
        customer.setRefresh_token_expiry(LocalDateTime.now().plusDays(7));
        customerRepository.update(customer);

        return Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken
        );
    }

    public String refreshAccessToken(String refreshToken) {
        if(!jwtUtil.validateToken(refreshToken)) 
            throw new RuntimeException("유효하지 않는 토큰입니다.");
        String user_id = jwtUtil.getUserId(refreshToken);
        Customer customer = customerRepository.findById(user_id);

        if (customer == null
                || !refreshToken.equals(customer.getRefresh_token())
                || customer.getRefresh_token_expiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh Token 만료 또는 불일치");
        }
        return jwtUtil.generateAccessToken(user_id);
    }
}
