package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import com.Write.Service.RepositoryLayer.SavedArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public String removeSavedArticle(String DOI, Long userID){
        System.out.println("Data Received");
        articlesRepository.removeSavedArticles(DOI,userID);
        return "OK";
    }

}
