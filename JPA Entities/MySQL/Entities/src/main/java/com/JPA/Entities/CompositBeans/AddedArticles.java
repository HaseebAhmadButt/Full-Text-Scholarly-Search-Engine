package com.JPA.Entities.CompositBeans;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
//import com.JPA.Entities.CompositKeyClasses.AddedArticlesID;
import com.JPA.Entities.Beans.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ADDED_AND_REJECTED_ARTICLES")
@Entity
//@IdClass(AddedArticlesID.class)
public class AddedArticles {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "ID", nullable = false, updatable = false, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long addedArticleID;
    //    @Id
    @ManyToOne
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
    private User adminId;



//    @Id
    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles DOI;

    public AddedArticles(User adminId, Articles DOI) {
        this.adminId = adminId;
        this.DOI = DOI;
    }
}
