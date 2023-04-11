package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedArticlesRepository extends JpaRepository<SavedArticles, User> {
//    @Modifying
    @Modifying
    @Query("delete from SavedArticles e where e.paper.Paper_DOI = ?1 and e.user.id = ?2")
    void removeSavedArticles(String DOI, Long user);
}
