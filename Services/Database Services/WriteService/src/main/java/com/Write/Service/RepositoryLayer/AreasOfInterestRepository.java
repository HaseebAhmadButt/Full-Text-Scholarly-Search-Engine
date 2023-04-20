package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AreasOfInterestRepository extends JpaRepository<AreasOfInterests, Publisher> {

    @Modifying
    @Query("delete from AreasOfInterests ai where ai.authorId.PublisherID = ?1")
    void deleteByAuthorNames(Long ID);

}
