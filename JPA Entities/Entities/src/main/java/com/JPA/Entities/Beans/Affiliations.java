package com.JPA.Entities.Beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Affiliations {
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Id
    @Column(name = "AFFILIATION_ID", unique = true, nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long id;

    @Column(name = "AFFILIATION_NAME", nullable = false)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String name;

    @Column(name = "AFFILIATION_LINK")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String affiliation_link;
}
