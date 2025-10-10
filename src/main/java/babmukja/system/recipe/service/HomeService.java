package babmukja.system.recipe.service;

import java.util.List;

import org.springframework.stereotype.Service;

import babmukja.system.recipe.entity.Banner;
import babmukja.system.recipe.repository.HomeRepository;

@Service
public class HomeService {
    private final HomeRepository homeRepository;

    public HomeService(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    public List<Banner> getActiveBanners() {
        return homeRepository.findActiveBanners();
    }
}
