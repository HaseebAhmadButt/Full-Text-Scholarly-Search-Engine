package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SavedArticlesRepository extends JpaRepository<SavedArticles, User> {
//    @Modifying
    @Modifying
    @Query("DELETE FROM SavedArticles e " +
            "WHERE e.user.id = :userId AND e.paper.Paper_DOI IN (:DOIs)")
    void removeSavedArticles(@Param("DOIs") List<String> DOIs, @Param("userId") Long userId);
}
