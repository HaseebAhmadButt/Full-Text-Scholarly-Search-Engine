package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.PaperAuthors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaperAuthorsRepository extends JpaRepository<PaperAuthors, Articles> {
}
