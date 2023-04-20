package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AuthorNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorNamesRepository extends JpaRepository<AuthorNames, Publisher> {

    @Modifying
    @Query("delete from AuthorNames an where an.authorId.PublisherID = ?1")
    void deleteByPublisherId(Long ID);


}
