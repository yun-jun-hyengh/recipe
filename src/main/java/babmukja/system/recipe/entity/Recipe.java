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
@Table(name = "recipe")
public class Recipe {
    
    @Id
    @Column(name = "recipe_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipe_idx;

    @Column(name = "user_idx")
    private Long user_idx;

    @Column(name = "recipe_title")
    private String recipe_title;

    @Column(name = "recipe_description")
    private String recipe_description;

    @Column(name = "recipe_content")
    private String recipe_content;

    @Column(name = "recipe_thumbnail")
    private String recipe_thumbnail;

    @Column(name = "recipt_thumbnail_path")
    private String recipt_thumbnail_path;

    @Column(name = "is_public")
    private Long is_public = 0L;

    @Column(name = "recipe_date")
    private String recipe_date;
}
