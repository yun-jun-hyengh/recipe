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
}
