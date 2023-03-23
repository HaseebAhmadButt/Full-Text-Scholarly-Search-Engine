package com.Write.Service.ServiceLayer;


import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AddedArticles;
import com.Write.Service.RepositoryLayer.AddedArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AddedArticlesService {

    @Autowired
    private AddedArticlesRepository articlesRepository;

    public void addArticles(Admin admin, Articles articles){
        articlesRepository.save(new AddedArticles(admin, articles));
    }

    public void removeArticlesFromAdded(String DOI, Long adminID){
//        Objects.requireNonNull(articlesRepository)
        articlesRepository.deleteByAdminIdAAndDOI(adminID, DOI);
    }


}
