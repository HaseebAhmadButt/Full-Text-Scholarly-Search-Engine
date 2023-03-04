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
@Table(name = "ADDED_ARTICLES")
@Entity
@IdClass(AddedArticlesID.class)
public class AddedArticles {
    @Id
    @ManyToOne
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "ADMIN_ID")
    private Admin adminId;

    @Id
    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles DOI;


}
