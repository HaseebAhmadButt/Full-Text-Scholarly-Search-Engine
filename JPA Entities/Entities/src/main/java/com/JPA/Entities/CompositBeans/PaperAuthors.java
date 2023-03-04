package com.JPA.Entities.CompositBeans;


import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositKeyClasses.PaperAuthorID;
import jakarta.persistence.*;

@Table(name = "PAPER_AUTHORS")
@Entity
@IdClass(PaperAuthorID.class)
public class PaperAuthors {
    @Id
    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles paper;

    @Id
    @ManyToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID")
    private Publisher author;
}
