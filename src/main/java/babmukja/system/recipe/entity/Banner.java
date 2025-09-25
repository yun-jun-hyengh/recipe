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
@Table(name = "banner")
public class Banner {
    
    @Id
    @Column(name = "ba_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ba_idx;

    @Column(name = "ba_img")
    private String ba_img;

    @Column(name = "ba_img_path")
    private String ba_img_path;

    @Column(name = "ba_descript")
    private String ba_descript;

    @Column(name = "ba_use")
    private Long ba_use;
}
