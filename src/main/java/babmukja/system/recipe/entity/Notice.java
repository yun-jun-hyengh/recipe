package babmukja.system.recipe.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notice")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {
    
    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "writer")
    private String writer;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "filename")
    private String filename;

    @Column(name = "filepath")
    private String filepath;

    @Column(name = "viewcount")
    private Long viewcount;

    @Column(name = "regdate")
    private String regdate;
}
