package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.CompositBeans.DeletedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedArticlesRepository extends JpaRepository<DeletedArticles, Admin> {

    void deleteByAdminIdAndDOI(Long adminID, String DOI);
}
