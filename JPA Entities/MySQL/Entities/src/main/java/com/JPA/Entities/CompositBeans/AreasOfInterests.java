package com.JPA.Entities.CompositBeans;

//import com.JPAEntities.Beans.Publisher;
//import com.JPAEntities.CompositKeyClasses.AreasOfInterestID;
import com.JPA.Entities.Beans.Publisher;
//import com.JPA.Entities.CompositKeyClasses.AreasOfInterestID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AREAS_OF_INTERESTS")
@Entity
public class AreasOfInterests {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "AuthorInterestID", nullable = false, updatable = false, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long authorInterestsID;
    @ManyToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID", nullable = false )
    private Publisher authorId;

    @Column(name = "INTEREST", nullable = false, length = 50)
    private String areaOfInterest;
}
