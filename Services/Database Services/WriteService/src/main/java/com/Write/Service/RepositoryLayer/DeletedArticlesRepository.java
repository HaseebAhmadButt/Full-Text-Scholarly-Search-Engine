package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.CompositBeans.DeletedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedArticlesRepository extends JpaRepository<DeletedArticles, Admin> {


    @Modifying
    @Query("delete from DeletedArticles da where da.adminId.id =?1 and da.DOI.Paper_DOI = ?2")
    void deleteByAdminIdAndDOI(Long adminID, String DOI);
}
