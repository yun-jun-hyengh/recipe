package babmukja.system.recipe.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import babmukja.system.recipe.dto.CustomerDTO;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.repository.CustomerRepository;
import babmukja.system.recipe.utils.DateUtils;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
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
    
}
