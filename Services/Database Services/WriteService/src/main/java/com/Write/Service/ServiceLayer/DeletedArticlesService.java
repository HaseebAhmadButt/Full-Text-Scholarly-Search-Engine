package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.DeletedArticles;
import com.Write.Service.RepositoryLayer.DeletedArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeletedArticlesService {

    @Autowired
    private DeletedArticlesRepository deletedArticlesRepository;

    public void rejectArticles(Admin admin, Articles articles, String reason){
        deletedArticlesRepository.save(new DeletedArticles(admin, articles, reason));
    }

    public void removeArticlesFromRejected(String DOI, Long adminID){
        deletedArticlesRepository.deleteByAdminIdAndDOI(adminID, DOI);
    }
}
