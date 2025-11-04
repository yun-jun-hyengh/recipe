package babmukja.system.recipe.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notice_reply")
public class NoticeReply {
    
    @Id
    @Column(name = "re_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long re_dix;

    @Column(name = "idx")
    private Long idx;

    @Column(name = "user_idx")
    private Long user_idx;

    @Column(name = "re_writer")
    private String re_writer;

    @Column(name = "re_content")
    private String re_content;

    @Column(name = "re_regdate")
    private String re_regdate;
}
