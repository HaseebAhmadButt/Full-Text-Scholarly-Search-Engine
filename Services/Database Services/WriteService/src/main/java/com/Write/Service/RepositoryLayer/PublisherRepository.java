package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    @Query("select Pu from Publisher Pu where Pu.PublisherEmail=?1")
    Publisher getPublisherByEmail(String email);
    @Query("select Pu from Publisher Pu where Pu.UserID.id=?1")
    Publisher getPublisherByUserID(Long ID);
}
