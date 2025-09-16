package babmukja.system.recipe.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.querydsl.core.Tuple;

import babmukja.system.recipe.constants.AdminPageParameterName;
import babmukja.system.recipe.dto.CustomerSearchDTO;
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
            row.put("unlimit_result", t.get(9, String.class));
            row.put("auth", t.get(10, String.class));
            row.put("remainingInactive", t.get(11, String.class));
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
}
