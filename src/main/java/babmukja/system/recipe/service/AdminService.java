package babmukja.system.recipe.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.repository.AdminRepository;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Tuple> userList(CustomerSearchDTO dto) {
        return adminRepository.userList(dto);
    }

    public long countCustomer(CustomerSearchDTO dto) {
        return adminRepository.countCustomer(dto);
    }
}
