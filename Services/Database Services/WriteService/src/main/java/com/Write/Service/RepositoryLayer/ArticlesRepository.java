package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, String> {
}
