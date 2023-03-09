package com.JPA.Entities.CompositBeans;

//import com.JPAEntities.Beans.Publisher;
//import com.JPAEntities.CompositKeyClasses.AreasOfInterestID;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositKeyClasses.AreasOfInterestID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AREAS_OF_INTERESTS")
@Entity
@IdClass(AreasOfInterestID.class)
public class AreasOfInterests {
    @Id
    @ManyToOne
    @JoinColumn(name = "PUBLISHER_ID", referencedColumnName = "PUBLISHER_ID", nullable = false )
    private Publisher authorId;

    @Id
    @Column(name = "INTEREST", nullable = false, length = 50)
    private String areaOfInterest;
}
