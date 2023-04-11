package com.JPA.Entities.Beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

//import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ARTICLES")
@Entity
public class Articles {
    @Id
    @Column(name = "DOI", nullable = false, unique = true, length = 200)
    private String Paper_DOI;

    @Column(name = "PAPER_TITLE", nullable = false, length = 300)
    private String Paper_Title;
    @Column(name = "PAPER_ABSTRACT", length = 1000)
    @JdbcTypeCode(SqlTypes.LONGVARCHAR)
    private String Paper_Abstract;

    @Column(name = "PUBLICATION_YEAR", length = 4)
    private String Published_Date;

    @Column(name = "PAPER_URL", unique = true)
    @JdbcTypeCode(SqlTypes.LONGVARCHAR)
    private String Paper_URL;

    @Column(name = "PAPER_STATUS", columnDefinition = "ENUM('ACCEPTED', 'IN-PROGRESS', 'REJECTED')")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String Paper_STATUS;
    @Column(name = "CREATED_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(name = "PAPER_UPDATE_TYPE", columnDefinition = "ENUM('UPLOADED', 'CRAWLED')")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String PAPER_UPDATE_TYPE;

    @ManyToOne
    @JoinColumn(name = "JOURNAL_ID", referencedColumnName = "JOURNAL_ID")
    private Journal Paper_Journal;

    @PostPersist
    protected void onCreate(){
        createdDate = new Date();
    }
}
