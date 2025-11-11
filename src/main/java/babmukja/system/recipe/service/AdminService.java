package babmukja.system.recipe.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.dto.BannerDeleteDTO;
import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.dto.CustomerUpdateDTO;
import babmukja.system.recipe.dto.OpenApiDataDTO;
import babmukja.system.recipe.dto.OpenApiDataResponseDTO;
import babmukja.system.recipe.entity.Banner;
import babmukja.system.recipe.repository.AdminRepository;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    @Value("${external.api.key}")
    private String apiKey;

    @Value("${external.api.url}")
    private String apiUrl;

    @Value("${public.api.service-id}")
    private String serviceId;

    private final RestTemplate restTemplate = new RestTemplate();

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

    public List<Banner> getAllBanners(int page, int size) {
        return adminRepository.findAllBanners(page, size);
    }

    public long getBannerCount() {
        return adminRepository.countBanners();
    }

    @Transactional
    public void deleteBannerList(BannerDeleteDTO dto) {
        for(Long ba_idx : dto.getBa_idx_list()) {
            String filePath = adminRepository.findImagePathByIdx(ba_idx);

            File file = new File(filePath);
            if(file.exists() && file.isFile()) {
                file.delete();
            }
            adminRepository.bannerDeleteByIdx(ba_idx);
        }
    }

    @Transactional
    public long updateBanner(Long ba_idx, String ba_descript, Long ba_use) {
        return adminRepository.updateBanner(ba_idx, ba_descript, ba_use);
    }

    public List<Map<String, Object>> getTop3NoticesWithCommentCount() {
        List<Tuple> results = adminRepository.findTop3NoticesWithCommentCount();
        List<Map<String, Object>> list = new ArrayList<>();
        for(Tuple tuple : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("idx", tuple.get(0, Long.class));
            map.put("writer", tuple.get(1, String.class));
            map.put("title", tuple.get(2, String.class));
            map.put("content", tuple.get(3, String.class));
            map.put("viewcount", tuple.get(4, Long.class));
            map.put("regdate", tuple.get(5, String.class));
            map.put("cnt", tuple.get(6, Long.class));

            list.add(map);
        }
        return list;
    }

    public OpenApiDataResponseDTO fetchOpenData(int startIdx, int endIdx, String rcp_nm) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
            .queryParam("keyId", apiKey)
            .queryParam("serviceId", serviceId)
            .queryParam("dataType", "json")
            .queryParam("startIdx", startIdx)
            .queryParam("endIdx", endIdx);
        
        if(rcp_nm != null && !rcp_nm.isEmpty()) {
            uriBuilder.queryParam("RCP_NM", rcp_nm);
        }
        String uri = uriBuilder.toUriString();
        Map<String, Object> responseMap = restTemplate.getForObject(uri, Map.class);

        Map<String, Object> cookRcp01 = (Map<String, Object>) responseMap.get("COOKRCP01");
        List<Map<String, Object>> rows = (List<Map<String, Object>>) cookRcp01.get("row");
        int totalCount = Integer.parseInt((String) cookRcp01.get("total_count"));

        List<OpenApiDataDTO> dtoList = rows.stream()
            .map(map -> {
                OpenApiDataDTO dto = new OpenApiDataDTO();
                dto.setRcp_seq((String) map.get("RCP_SEQ"));
                dto.setRcp_nm((String) map.get("RCP_NM"));
                return dto;
            }).collect(Collectors.toList());
        OpenApiDataResponseDTO result = new OpenApiDataResponseDTO();
        result.setTotalCount(totalCount);
        result.setRows(dtoList);
        return result;
    }
}
