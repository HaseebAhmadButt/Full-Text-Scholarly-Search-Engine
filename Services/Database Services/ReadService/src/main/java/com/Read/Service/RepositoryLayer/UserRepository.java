package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String Email);

    @Query("SELECT pub FROM Publisher pub WHERE pub.UserID.id=?1")
    Publisher findAssociatedPublisher(Long ID);

    @Query("SELECT an.PublishedName FROM AuthorNames an WHERE an.authorId.PublisherID = ?1")
    List<String> getAuthorNames(Long ID);

    @Query("SELECT ai.areaOfInterest FROM AreasOfInterests ai WHERE ai.authorId.PublisherID = ?1")
    List<String> getAuthorInterests(Long ID);


}
