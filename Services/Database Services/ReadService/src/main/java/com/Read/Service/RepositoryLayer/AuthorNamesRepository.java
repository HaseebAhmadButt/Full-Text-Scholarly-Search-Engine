package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AuthorNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorNamesRepository extends JpaRepository<AuthorNames, Publisher> {

    @Query("select an.PublishedName from AuthorNames an where an.authorId.PublisherID = ?1")
    List<String> getAuthorNames(Long ID);
}
