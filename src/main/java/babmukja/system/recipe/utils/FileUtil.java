package babmukja.system.recipe.utils;

import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class FileUtil {
    
    /**
     * 파일 경로 그대로 접근해서 반환
     * 서버에 저장된 전체 경로 (예: C:/upload/b/e462.png)
     */

    public static ResponseEntity<Resource> serverFile(String fullPath) {
        File file = new File(fullPath);
        if(!file.exists() || !file.isFile()) {
            return ResponseEntity.notFound().build();
        }
        // String extension = getFileExtension(file.getName()).toLowerCase();
        String extension = fullPath.substring(fullPath.lastIndexOf(".") + 1).toLowerCase();
        MediaType mediaType;
        switch (extension) {
            case "png":
                mediaType = MediaType.IMAGE_PNG;
                break;
            case "jpg":
            case "jpeg":
                mediaType = MediaType.IMAGE_JPEG;
                break;
            case "bmp":
                mediaType = MediaType.valueOf("image/bmp");
                break;
            case "tif":
            case "tiff":
                mediaType = MediaType.valueOf("image/tiff");
                break;
            default:
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }
        return ResponseEntity.ok().contentType(mediaType).body(new FileSystemResource(file));
    }

    // public static String getFileExtension(String fileName) {
    //     int idx = fileName.lastIndexOf(".");
    //     return idx != -1 ? fileName.substring(idx + 1) : "";
    // }

}
