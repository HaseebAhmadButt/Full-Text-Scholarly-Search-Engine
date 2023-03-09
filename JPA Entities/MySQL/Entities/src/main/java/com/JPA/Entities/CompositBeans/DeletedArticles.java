package com.JPA.Entities.CompositBeans;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositKeyClasses.AddedArticlesID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "DELETED_ARTICLES")
@Entity
@IdClass(AddedArticlesID.class)
public class DeletedArticles {
    @Id
    @ManyToOne
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "ADMIN_ID")
    private Admin adminId;
    @Id
    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles DOI;

    @Column(name = "REASON")
    private String reason;


}
