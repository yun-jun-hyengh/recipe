package babmukja.system.recipe.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.constants.AdminPageParameterName;
import babmukja.system.recipe.dto.BannerRegisterDTO;
import babmukja.system.recipe.dto.CustomerDeleteDTO;
import babmukja.system.recipe.dto.CustomerSearchDTO;
import babmukja.system.recipe.dto.CustomerUpdateDTO;
import babmukja.system.recipe.service.AdminService;
import babmukja.system.recipe.utils.ResponseJsonUtils;

@RestController
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
        System.out.println("파일 이름 : " + bannerRegisterDTO.getBa_img());
        System.out.println("설명 : " + bannerRegisterDTO.getBa_descript());
        System.out.println("사용여부 : " + bannerRegisterDTO.getBa_use());
        return ResponseJsonUtils.mapResponse("success", "배너등록완료",null);
    }
}
