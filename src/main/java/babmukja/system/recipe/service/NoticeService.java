package babmukja.system.recipe.service;

import org.springframework.stereotype.Service;

import babmukja.system.recipe.repository.NoticeRepository;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
}
