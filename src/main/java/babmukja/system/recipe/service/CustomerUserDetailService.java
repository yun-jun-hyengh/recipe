package babmukja.system.recipe.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.repository.CustomerRepository;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    public CustomerUserDetailService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer user = customerRepository.findById(username);
        if (user == null) {
            throw new UsernameNotFoundException("해당 유저를 찾지 못하였습니다.");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(user.getAdminchk() == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        return new org.springframework.security.core.userdetails.User(
            user.getUser_id(), user.getUser_pw(), authorities);
    }
    
}
