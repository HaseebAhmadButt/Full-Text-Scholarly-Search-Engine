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
@Table(name = "DELETED_ARTICLES")
@Entity
//@IdClass(AddedArticlesID.class)
public class DeletedArticles {
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

    @Column(name = "REASON")
    private String reason;

    public DeletedArticles(User adminId, Articles DOI, String reason) {
        this.adminId = adminId;
        this.DOI = DOI;
        this.reason = reason;
    }
}
