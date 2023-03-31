package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.CompositBeans.AddedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddedArticlesRepository extends JpaRepository<AddedArticles, Admin> {

//    Error in this method declaration
//    void deleteByAdminIdAAndDOI(Long adminID, String DOI);

}
