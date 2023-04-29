package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.BlockedAuthors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockedAuthorsRepository extends JpaRepository<BlockedAuthors, Publisher> {

    @Modifying
    @Query("DELETE FROM BlockedAuthors ba where ba.authorId.PublisherID=?1")
    void deleteByAuthorId(Long publisherID);
}
