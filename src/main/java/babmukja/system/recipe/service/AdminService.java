package babmukja.system.recipe.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.dto.CustomerUpdateDTO;
import babmukja.system.recipe.entity.Banner;
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

    public List<Map<String, Object>> getRecentCustomer() {
        return adminRepository.findRecentUsers();
    }

    public boolean deleteCustomer(Long user_idx) {
        long deleteCount = adminRepository.deleteByCustomerIdx(user_idx);
        return deleteCount > 0;
    }

    public boolean updateCustomer(CustomerUpdateDTO dto) {
        return adminRepository.updateByCustomerIdx(dto) > 0;
    }

    public void saveBanner(Banner banner) {
        adminRepository.bannerSave(banner);
    }
}
