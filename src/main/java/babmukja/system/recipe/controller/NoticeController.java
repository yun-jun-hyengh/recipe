package babmukja.system.recipe.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import babmukja.system.recipe.constants.NoticeParameterName;
import babmukja.system.recipe.dto.NoticeResponseDTO;
import babmukja.system.recipe.dto.NoticeWriteDTO;
import babmukja.system.recipe.service.NoticeService;
import babmukja.system.recipe.utils.ResponseJsonUtils;

@RestController
public class NoticeController {
    private final NoticeService noticeService;

    @Value("${app.upload.root}")
    private String uploadRoot;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }
    
    @PostMapping(value = NoticeParameterName.NOTICEWRITE, consumes = {"multipart/form-data"})
    @ResponseBody
    public ResponseEntity<?> write(@ModelAttribute NoticeWriteDTO dto) {
        try {
            //String noticeDir = uploadRoot + File.separator + "notice";
            String noticeDir = uploadRoot + "/notice";
            File dir = new File(noticeDir);
            if(!dir.exists()) {
                dir.mkdirs();
            }
            MultipartFile file = dto.getFile();
            if(file != null && !file.isEmpty()) {
                String originalName = file.getOriginalFilename();
                String ext = "";

                int dot = originalName.lastIndexOf(".");
                if (dot > -1) ext = originalName.substring(dot);

                String savedName = UUID.randomUUID().toString().replace("-", "") + ext;
                //String savedPath = noticeDir + File.separator + savedName;
                String savedPath = noticeDir + "/" + savedName;

                file.transferTo(new File(savedPath));
                dto.setFilename(savedName);
                //dto.setFilepath("/babmujakfile/notice/" + savedName);
                dto.setFilepath(savedPath);
            } else {
                dto.setFilename(null);
                dto.setFilepath(null);
            }
            noticeService.createNotice(dto);
            return ResponseEntity.ok(ResponseJsonUtils.mapResponse("success", "공지사항 등록 성공", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ResponseJsonUtils.mapResponse("fail", "공지사항 등록 실패: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping(NoticeParameterName.NOTICELIST)
    @ResponseBody
    public List<Map<String, Object>> list() {
        List<NoticeResponseDTO> notices = noticeService.getNoticeList();
        List<Map<String, Object>> data = notices.stream().map(n -> {
            Map<String, Object> map = new HashMap<>();
            map.put("idx", n.getIdx());
            map.put("title", n.getTitle());
            map.put("writer", n.getWriter());
            map.put("content", n.getContent());
            map.put("regdate", n.getRegdate());
            map.put("viewcount", n.getViewcount());
            map.put("filename", n.getFilename());
            map.put("filepath", n.getFilepath());
            return map;
        }).collect(Collectors.toList());

        return ResponseJsonUtils.listMapResponse("success", null, data);
    }
}
