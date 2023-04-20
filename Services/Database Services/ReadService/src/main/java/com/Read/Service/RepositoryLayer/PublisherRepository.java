package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

        @Query("select Pu from Publisher Pu where Pu.UserID.id=?1")
        Publisher getPublisherThroughUserID(Long ID);

//        @Query("SELECT pa.paper.Paper_DOI FROM PaperAuthors pa " +
//                "JOIN Articles ar on ar.Paper_DOI = pa.paper.Paper_DOI " +
//                "JOIN Publisher pu on pu.PublisherID = pa.author.PublisherID " +
//                "GROUP BY pa.paper.Paper_DOI")


}
