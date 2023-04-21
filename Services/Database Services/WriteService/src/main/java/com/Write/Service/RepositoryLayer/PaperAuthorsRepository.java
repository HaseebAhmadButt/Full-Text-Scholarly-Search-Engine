package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.PaperAuthors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperAuthorsRepository extends JpaRepository<PaperAuthors, Long> {
    @Modifying
    @Query("DELETE FROM PaperAuthors pa WHERE pa.paper.Paper_DOI IN (?1)AND pa.author.PublisherID = ?2")
    void deleteEntity(List<String> DOI, Long publisherID);



}
