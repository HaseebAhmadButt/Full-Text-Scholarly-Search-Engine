package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Articles;
//import com.JPA.Entities.CompositKeyClasses.ReferencesID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PAPER_REFERENCES")
@Entity
//@IdClass(ReferencesID.class)
public class References {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "DOI", referencedColumnName = "DOI")
    private Articles articleId;

    @OneToOne
    @JoinColumn(name = "REFERENCES_TO_DOI", referencedColumnName = "DOI")
    private Articles articleI2;
    public References(Articles articleId, Articles articleI2){
        this.articleId=articleId;
        this.articleI2=articleI2;
    }
}
