package babmukja.system.recipe.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import babmukja.system.recipe.constants.HomePageParameterName;
import babmukja.system.recipe.entity.Banner;
import babmukja.system.recipe.entity.Customer;
import babmukja.system.recipe.service.HomeService;
import babmukja.system.recipe.utils.ResponseJsonUtils;

@RestController
public class HomeController {
    
//    @GetMapping("/")
//    public String home() {
//        return "index.html";
//    }

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    // 여기 배너 리스트 추가 
    @GetMapping(HomePageParameterName.BANNERACTIVELIST)
    public List<Map<String, Object>> getActiveBanners() {
        List<Banner> banners = homeService.getActiveBanners();
        return ResponseJsonUtils.listMapResponse("success", "배너리스트", banners);
    }
}
