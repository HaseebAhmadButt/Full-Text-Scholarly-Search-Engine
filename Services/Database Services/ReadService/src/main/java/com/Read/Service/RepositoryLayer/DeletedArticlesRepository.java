package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.CompositBeans.DeletedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedArticlesRepository extends JpaRepository<DeletedArticles, Admin> {


//    Have a look at its declaraton. Need to add query in it
//    void deleteByAdminIdAndDOI(Long adminID, String DOI);
}
