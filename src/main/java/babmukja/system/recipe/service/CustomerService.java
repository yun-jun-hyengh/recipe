package babmukja.system.recipe.service;

import org.springframework.stereotype.Service;

import babmukja.system.recipe.dto.CustomerDTO;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.repository.CustomerRepository;
import babmukja.system.recipe.utils.DateUtils;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public boolean join(CustomerDTO dto) {

        try {
            Customer customer = new Customer();
            customer.setUser_id(dto.getUser_id());
            customer.setUser_pw(dto.getUser_pw());
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
