package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedArticlesRepository extends JpaRepository<SavedArticles, User> {

    @Query("delete from SavedArticles e where e.paper = ?1 and e.user = ?2")
    SavedArticles removeSavedArticlesByCompositKey(Articles DOI, User user);
}
