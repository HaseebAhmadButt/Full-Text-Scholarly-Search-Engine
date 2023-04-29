package com.JPA.Entities.CompositBeans;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
//import com.JPA.Entities.CompositKeyClasses.SavedArticlesID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SAVED_ARTICLES")
@Entity
//@IdClass(SavedArticlesID.class)
public class SavedArticles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles paper;

//    public SavedArticles(){}

    public SavedArticles(User user, Articles articles){

    }
}
