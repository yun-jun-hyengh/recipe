package babmukja.system.recipe.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.constants.AdminPageParameterName;
import babmukja.system.recipe.dto.BannerDeleteDTO;
import babmukja.system.recipe.dto.BannerRegisterDTO;
import babmukja.system.recipe.dto.BannerUpdateDTO;
import babmukja.system.recipe.dto.CustomerDeleteDTO;
import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.dto.CustomerUpdateDTO;
import babmukja.system.recipe.entity.Banner;
import babmukja.system.recipe.service.AdminService;
import babmukja.system.recipe.utils.FileUtil;
import babmukja.system.recipe.utils.JwtUtil;
import babmukja.system.recipe.utils.ResponseJsonUtils;

@RestController
public class AdminController {
    private final AdminService adminService;
    private final JwtUtil jwtUtil;
    @Value("${app.upload.root}")
    private String uploadRoot;

    public AdminController(AdminService adminService, JwtUtil jwtUtil) {
        this.adminService = adminService;
        this.jwtUtil = jwtUtil;
    }

    @ResponseBody
    @GetMapping(AdminPageParameterName.USERLIST)
    public List<Map<String, Object>> getUserList(@ModelAttribute CustomerSearchDTO dto) {
        List<Tuple> results = adminService.userList(dto);
        long totalCount = adminService.countCustomer(dto);

        List<Map<String, Object>> dataList = new ArrayList<>();
        for(Tuple t : results) {
            Map<String, Object> row = new HashMap<>();
            row.put("user_idx", t.get(0, Long.class));
            row.put("user_id", t.get(1, String.class));
            row.put("user_name", t.get(2, String.class));
            row.put("user_phone", t.get(3, String.class));
            row.put("user_email", t.get(4, String.class));
            row.put("nickname", t.get(5, String.class));
            row.put("regdate", t.get(6, String.class));
            row.put("private_recipe_limit", t.get(7, Long.class));
            row.put("unlimit", t.get(8, Long.class));
            row.put("adminchk", t.get(9, Long.class));
            row.put("unlimit_result", t.get(10, String.class));
            row.put("auth", t.get(11, String.class));
            row.put("remainingInactive", t.get(12, String.class));
            dataList.add(row);
        }

       // return ResponseJsonUtils.listMapResponse("success", "회원조회완료", dataList);
       return ResponseJsonUtils.listMapResponse(
            "success", 
            "회원조회완료", 
            dataList, 
            totalCount, 
            dto.getPage(), 
            (int) Math.ceil((double) totalCount / dto.getPageSize()));
    }

    @GetMapping(AdminPageParameterName.USERTOP5)
    public List<Map<String, Object>> getRecentCustomer() {
        List<Map<String, Object>> data = adminService.getRecentCustomer();
        return ResponseJsonUtils.listMapResponse("success", "최근가입회원5명조회완료", data);
    }

    @DeleteMapping(AdminPageParameterName.USERADMINDEL)
    public Map<String, Object> deleteCustomer(@RequestBody CustomerDeleteDTO dto) {
        boolean success = adminService.deleteCustomer(dto.getUser_idx());
        if(success) {
            return ResponseJsonUtils.mapResponse("success", "회원삭제완료", null);
        } else {
            return ResponseJsonUtils.mapResponse("fail", "회원삭제실패", null);
        }
    }

    @PostMapping(AdminPageParameterName.USERADMINUPDATE)
    @ResponseBody
    public Map<String, Object> updateCustomer(@RequestBody CustomerUpdateDTO dto) {
        boolean success = adminService.updateCustomer(dto);
        return success 
                ? ResponseJsonUtils.mapResponse("success", "회원 수정 완료", null) 
                : ResponseJsonUtils.mapResponse("fail", "회원 수정 실패", null);
    }

    @PostMapping(AdminPageParameterName.BANNERREGISTER)
    public Map<String, Object> registerBanner(@ModelAttribute BannerRegisterDTO bannerRegisterDTO) {
        // System.out.println("파일 이름 : " + bannerRegisterDTO.getBa_img());
        // System.out.println("설명 : " + bannerRegisterDTO.getBa_descript());
        // System.out.println("사용여부 : " + bannerRegisterDTO.getBa_use());
        MultipartFile file = bannerRegisterDTO.getBa_img();

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String storedFileName = UUID.randomUUID() + extension;
            String bannerDir = uploadRoot + "/banner";

            File dest = new File(bannerDir + "/" + storedFileName);
            dest.getParentFile().mkdirs();
            file.transferTo(dest);

            Banner banner = new Banner();
            banner.setBa_img(storedFileName);
            banner.setBa_img_path(bannerDir + "/" + storedFileName);
            banner.setBa_descript(bannerRegisterDTO.getBa_descript());
            banner.setBa_use(bannerRegisterDTO.getBa_use());
            adminService.saveBanner(banner);
            return ResponseJsonUtils.mapResponse("success", "배너등록완료",null);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseJsonUtils.mapResponse("fail", "배너등록실패", null);
        }
    }

    @GetMapping(AdminPageParameterName.BANNERLIST)
    public List<Map<String, Object>> getBannerList(@RequestParam(defaultValue = "1") int page, 
                                                   @RequestParam(defaultValue = "10") int size) {
        page = Math.max(page, 1);
        List<Banner> banners = adminService.getAllBanners(page, size);
        long totalElements = adminService.getBannerCount();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        List<Map<String, Object>> dataList = new ArrayList<>();
        for(Banner b : banners) {
            Map<String, Object> map = new HashMap<>();
            map.put("ba_idx", b.getBa_idx());
            map.put("ba_img", b.getBa_img());
            map.put("ba_img_path", b.getBa_img_path());
            map.put("ba_descript", b.getBa_descript());
            map.put("ba_use", b.getBa_use());
            dataList.add(map);
        }
        return ResponseJsonUtils.listMapResponse(
            "success", 
            "배너 리스트 조회", 
            dataList,
            totalElements, page, totalPages);
    }

    @GetMapping(AdminPageParameterName.BANNERIMAGE)
    public ResponseEntity<Resource> serveBanner(@RequestParam String path, @RequestParam String token) {
        if(!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return FileUtil.serverFile(path);
    }

    @PostMapping(AdminPageParameterName.BANNERDELETE)
    @ResponseBody
    public ResponseEntity<?> deleteBanners(@RequestBody BannerDeleteDTO dto) {
        try {
            adminService.deleteBannerList(dto);
            return ResponseEntity.ok(
                ResponseJsonUtils.mapResponse("success", "선택된 배너가 삭제되었습니다.", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(
                ResponseJsonUtils.mapResponse("error", "삭제 중 오류 발생", null)
            );
        }
    }

    @PostMapping(AdminPageParameterName.BANNERUPDATE)
    @ResponseBody
    public Map<String, Object> updateBanner(@RequestBody BannerUpdateDTO dto) {
        long updated = adminService.updateBanner(dto.getBa_idx(), dto.getBa_descript(), dto.getBa_use());
        if(updated > 0) {
            return ResponseJsonUtils.mapResponse("success", "배너 수정 완료", null);
        } else {
            return ResponseJsonUtils.mapResponse("fail", "배너 수정 실패", null);
        }
    }

    @GetMapping(AdminPageParameterName.NOTICETOP3)
    @ResponseBody
    public List<Map<String, Object>> getTop3Notices() {
        try {
            List<Map<String, Object>> data = adminService.getTop3NoticesWithCommentCount();
            return ResponseJsonUtils.listMapResponse("success", "top3 게시글 조회 성공", data);
        } catch (Exception e) {
            return ResponseJsonUtils.listMapResponse("fail", "top3 게시글 조회 실패", null);
        }
    }
}
