package babmukja.system.recipe.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import babmukja.system.recipe.dto.NoticeResponseDTO;
import babmukja.system.recipe.dto.NoticeWriteDTO;
import babmukja.system.recipe.entity.Notice;
import babmukja.system.recipe.repository.NoticeRepository;
import babmukja.system.recipe.utils.DateUtils;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Long createNotice(NoticeWriteDTO dto) {
        Notice notice = Notice.builder()
            .writer(dto.getWriter())
            .title(dto.getTitle())
            .content(dto.getContent())
            .filename(dto.getFilename())
            .filepath(dto.getFilepath())
            .regdate(DateUtils.getCurrentDate())
            .build();
        noticeRepository.save(notice);
        return notice.getIdx();
    }

    public List<NoticeResponseDTO> getNoticeList() {
        return noticeRepository.noticeList();
    }

    public Map<String, Object> getNoticeDetail(Long idx) {
        return noticeRepository.findNoticeDetail(idx);
    }
}
