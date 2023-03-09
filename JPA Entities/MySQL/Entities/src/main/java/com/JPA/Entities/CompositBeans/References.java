package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositKeyClasses.ReferencesID;
import jakarta.persistence.*;

@Table(name = "PAPER_REFERENCES")
@Entity
@IdClass(ReferencesID.class)
public class References {
    @Id
    @OneToOne
    @JoinColumn(name = "DOI", referencedColumnName = "DOI")
    private Articles articleId;

    @Id
    @OneToOne
    @JoinColumn(name = "REFERENCES_TO_DOI", referencedColumnName = "DOI")
    private Articles articleI2;
}
