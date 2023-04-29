package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Publisher;
//import com.JPA.Entities.CompositKeyClasses.AuthorNamesCompositeKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AUTHOR_NAMES")
@Entity
public class AuthorNames {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "AuthorNameID", nullable = false, updatable = false, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long authorNameID;
    @ManyToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID", nullable = false )
    private Publisher authorId;

    @Column(name = "PUBLISHED_NAME", nullable = false, length = 50)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String PublishedName;
}
