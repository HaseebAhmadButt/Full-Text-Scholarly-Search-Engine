package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreasOfInterestRepository extends JpaRepository<AreasOfInterests, Publisher> {

    @Query("select ai.areaOfInterest from AreasOfInterests ai where ai.authorId.PublisherID = ?1")
    List<String> getAreasOfInterests(Long ID);
}
