package babmukja.system.recipe.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import babmukja.system.recipe.constants.NoticeParameterName;
import babmukja.system.recipe.dto.NoticeIdxDTO;
import babmukja.system.recipe.dto.NoticeReplyPageDTO;
import babmukja.system.recipe.dto.NoticeReplyRegisterDTO;
import babmukja.system.recipe.dto.NoticeResponseDTO;
import babmukja.system.recipe.dto.NoticeSearchDTO;
import babmukja.system.recipe.dto.NoticeUpdateDTO;
import babmukja.system.recipe.dto.NoticeWriteDTO;
import babmukja.system.recipe.service.NoticeService;
import babmukja.system.recipe.utils.FileUtil;
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
    public List<Map<String, Object>> list(@ModelAttribute NoticeSearchDTO dto) {
        long[] totalElementsHolder = new long[1];
        List<NoticeResponseDTO> notices = noticeService.getNoticeList(dto, totalElementsHolder);

        long totalElements = totalElementsHolder[0];
        int pageSize = 10;
        int totalPages = (int) Math.ceil((double) totalElements / pageSize);

        return ResponseJsonUtils.listMapResponse("success", "조회성공", notices, totalElements, dto.getPage(), totalPages);
    }

    @GetMapping(NoticeParameterName.NOTICEDETAIL)
    public Map<String, Object> getNoticeDetail(NoticeIdxDTO dto) {
        Map<String, Object> detail = noticeService.getNoticeDetail(dto.getIdx());
        if(detail == null) {
            return ResponseJsonUtils.mapResponse("fail", "해당 게시글이 존재하지 않습니다.", null);
        } 
        return ResponseJsonUtils.mapResponse("success", "조회성공", detail);
    }

    @PostMapping(NoticeParameterName.NOTICEDELETE)
    public Map<String, Object> deleteNotice(@RequestBody NoticeIdxDTO dto) {
        Long idx = dto.getIdx();
        System.out.println(idx);
        boolean result = noticeService.deleteNotice(idx);
        if(result) {
            return ResponseJsonUtils.mapResponse("success", "공지사항 삭제 완료", null);
        } else {
            return ResponseJsonUtils.mapResponse("fail", "삭제실패", null);
        }
    }

    @GetMapping(NoticeParameterName.NOTICEIMAGE)
    public ResponseEntity<Resource> findImage(@RequestParam String path) {
        return FileUtil.serverFile(path);
    }

    @GetMapping(NoticeParameterName.NOTICEPREVNEXT)
    @ResponseBody
    public Map<String, Object> getPrevNext(@ModelAttribute NoticeIdxDTO dto) {
        try {
            Map<String, Object> data = noticeService.getPrevNextNotice(dto.getIdx());
            return ResponseJsonUtils.mapResponse("success", "이전/다음글 조회 성공", data);
        } catch (Exception e) {
            return ResponseJsonUtils.mapResponse("fail", "이전/다음글 조회 실패: " + e.getMessage(), null);
        }
    }

    @PostMapping(NoticeParameterName.NOTICEUPDATE)
    @ResponseBody
    public Map<String, Object> updateNotice(@ModelAttribute NoticeUpdateDTO dto) {
        try {
            // String noticeDir = uploadRoot + "/notice";
            // File dir = new File(noticeDir);
            // if(!dir.exists()) {
            //     dir.mkdirs();
            // }
            Path noticeDir = Paths.get(uploadRoot, "notice");
            // System.out.println(noticeDir);
            if (!Files.exists(noticeDir)) {
                Files.createDirectories(noticeDir);
            }
            if(dto.getFile() != null && !dto.getFile().isEmpty()) {
                String originalName = dto.getFile().getOriginalFilename();
                String extension = "";

                if(originalName != null && originalName.contains(".")) {
                    extension = originalName.substring(originalName.lastIndexOf("."));
                }

                String uuid = UUID.randomUUID().toString();
                String savedFileName = uuid + extension;

                Path savePath = noticeDir.resolve(savedFileName);
                dto.getFile().transferTo(savePath.toFile());

                dto.setFilename(savedFileName);
                dto.setFilepath(savePath.toString().replace("\\", "/"));
            }
            noticeService.updateNotice(dto);
            return ResponseJsonUtils.mapResponse("success", "공지사항 수정 완료", null);
        } catch(Exception e) {
            return ResponseJsonUtils.mapResponse("fail", "수정 실패: " + e.getMessage(), null);
        }
    }

    @PostMapping(NoticeParameterName.NOTICEREPLYJOIN)
    public ResponseEntity<?> insertComment(@RequestBody NoticeReplyRegisterDTO dto) {
        try {
            noticeService.insertReply(dto);
            return ResponseEntity.ok(
                ResponseJsonUtils.mapResponse("success", "댓글 등록 완료", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(
                ResponseJsonUtils.mapResponse("fail", "댓글 등록 실패", e.getMessage())
            );
        }
    }

    @GetMapping(NoticeParameterName.NOTICEREPLYLIST)
    public ResponseEntity<?> getComments(@ModelAttribute NoticeReplyPageDTO dto) {
        try {
            Map<String, Object> result = noticeService.getComments(dto);
            return ResponseEntity.ok(
                ResponseJsonUtils.listMapResponse(
                    "success", 
                    "댓글 목록", 
                    result.get("comments"), 
                    (long) result.get("totalElements"), 
                    (int) result.get("currentPage"),
                    (int) result.get("totalPages"))
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(
                ResponseJsonUtils.listMapResponse(
                    "fail", 
                    "댓글 조회 실패", 
                    null, 0L, 0, 0)
            );
        }
    }

}
