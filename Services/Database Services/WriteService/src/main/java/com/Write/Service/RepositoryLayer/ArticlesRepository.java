package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticlesRepository extends JpaRepository<Articles, String> {
}
