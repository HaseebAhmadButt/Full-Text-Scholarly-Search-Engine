package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.AddedArticles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AddedArticlesRepository extends JpaRepository<AddedArticles, Admin> {


    @Modifying
    @Query("DELETE FROM AddedArticles ad WHERE ad.DOI.Paper_DOI=?2 and ad.adminId.id=?1")
    void deleteByAdminIdAndDOI(Long adminId, String DOI);


}
