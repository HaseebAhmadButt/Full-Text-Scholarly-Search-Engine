package com.JPA.Entities.Beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PUBLISHER")
@Entity
public class Publisher {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "PUBLISHER_ID", nullable = false, updatable = false, length = 20, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long PublisherID;
    @Column(name = "PUBLISHER_NAME", nullable = false, length = 50)
    private String PublisherName;

    @Column(name = "PUBLISHER_EMAIL", nullable = false, unique = true)
    private String PublisherEmail;

    @Column(name = "PUBLISHER_WEBSITE", unique = true)
    private String PublisherSite;

    @Column(name = "PUBLISHER_HINDEX")
    private double PublisherHIndex;

    @Column(name = "PUBLISHER_HMEDIAN")
    private double PublisherHMedian;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
    private User UserID;

    @OneToOne
    @JoinColumn(name = "AFFILIATION_ID", referencedColumnName = "AFFILIATION_ID")
    private Affiliations AffiliationID;

    @Override
    public String toString() {
        return "Publisher{" +
                "PublisherID=" + PublisherID +
                ", PublisherName='" + PublisherName + '\'' +
                ", PublisherEmail='" + PublisherEmail + '\'' +
                ", PublisherSite='" + PublisherSite + '\'' +
                ", PublisherHIndex=" + PublisherHIndex +
                ", PublisherHMedian=" + PublisherHMedian +
                ", UserID=" + UserID +
                ", AffiliationID=" + AffiliationID +
                '}';
    }
}

//
