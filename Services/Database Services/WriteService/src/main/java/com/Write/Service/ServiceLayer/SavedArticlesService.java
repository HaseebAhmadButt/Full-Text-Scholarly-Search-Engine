package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import com.Write.Service.RepositoryLayer.SavedArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SavedArticlesService {

    @Autowired
    private SavedArticlesRepository articlesRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ArticlesService articlesService;

    public String saveArticle(String DOI, Long UserID){
        User user = userService.getUser(UserID);
        Articles articles = articlesService.getArticleByID(DOI);
        articlesRepository.save(new SavedArticles(user, articles));
        return "OK";
    }

    public String saveArticles(String[] DOI, Long UserID){
        User user = userService.getUser(UserID);
        List<SavedArticles> savedArticles  = new ArrayList<>();
        Articles articles;
        for (String doi: DOI){
             articles = articlesService.getArticleByID(doi);
            SavedArticles savedArticles1 = new SavedArticles(user, articles);
            savedArticles.add(savedArticles1);
        }
        articlesRepository.saveAll(savedArticles);
        return "OK";
    }

    public String removeSavedArticle(String DOI, Long userID){
        User user = userService.getUser(userID);
        Articles articles =  articlesService.getArticleByID(DOI);
        articlesRepository.removeSavedArticlesByCompositKey(articles,user);
        return "OK";
    }

}
