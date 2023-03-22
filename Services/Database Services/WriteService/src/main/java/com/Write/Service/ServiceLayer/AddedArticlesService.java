package com.Write.Service.ServiceLayer;


import com.JPA.Entities.CompositBeans.AddedArticles;
import com.Write.Service.RepositoryLayer.AddedArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddedArticlesService {

    @Autowired
    private AddedArticlesRepository articlesRepository;


}
