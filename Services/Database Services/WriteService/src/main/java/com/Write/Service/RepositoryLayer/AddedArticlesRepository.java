package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.CompositBeans.AddedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddedArticlesRepository extends JpaRepository<AddedArticles, Admin> {
}
