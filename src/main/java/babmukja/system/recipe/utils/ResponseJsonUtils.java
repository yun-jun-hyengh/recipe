package babmukja.system.recipe.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseJsonUtils {
    
    private ResponseJsonUtils() {

    }

    public static Map<String, Object> mapResponse(String status, String message, Object data) {
        Map<String, Object> res = new HashMap<>();
        res.put("status", status);
        res.put("message", message);
        res.put("data", data);
        return res;
    }

    public static List<Map<String, Object>> listMapResponse(String status, String message, Object data) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", status);
        map.put("message", message);
        map.put("data", data);

        List<Map<String, Object>> list = new ArrayList<>();
        list.add(map);
        return list;
    }

    public static Map<String, Object> mapWithList(String status, String message, List<?> data) {
        Map<String, Object> res = new HashMap<>();
        res.put("status", status);
        res.put("message", message);
        res.put("data", data);  // List<?> 그대로 넣으면 Map 안에 리스트 구조
        return res;
    }

    public static List<List<?>> listOfListResponse(List<List<?>> data) {
        return data;
    }

    public static Map<String, Object> nestedMapResponse(String status, String message, Map<String, Object> data) {
        Map<String, Object> res = new HashMap<>();
        res.put("status", status);
        res.put("message", message);
        res.put("data", data);
        return res;
    }
}
