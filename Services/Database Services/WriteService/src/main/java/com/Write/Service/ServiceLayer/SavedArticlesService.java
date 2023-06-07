package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.SavedArticles;
import com.Write.Service.RepositoryLayer.SavedArticlesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class SavedArticlesService {

    @Autowired
    private SavedArticlesRepository articlesRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ArticlesService articlesService;

    public String saveArticle(List<String> DOIs, Long UserID){
        User user = userService.getUser(UserID);
        System.out.println("user = " + user);
        List<SavedArticles> articlesList = new ArrayList<>();
        for (String DOI: DOIs){
            articlesList.add(new SavedArticles(user, articlesService.getArticleByID(DOI)));
        }
//        Articles articles = articlesService.getArticleByID(DOI);
        articlesRepository.saveAll(articlesList);
//        Articles articles = articlesService.getArticleByID(DOIs.get(0));
//        System.out.println("articles = " + articles);
//
//        articlesRepository.save(new SavedArticles(user, articles));
        return "OK";
    }
//    List<SavedArticles> articlesList = new ArrayList<>();
//        for (String DOI: DOIs){
//            articlesList.add(new SavedArticles(user, articlesService.getArticleByID(DOI)));
//        }
//        Articles articles = articlesService.getArticleByID(DOI);
//        articlesRepository.saveAll(articlesList);

    @Transactional
    public String removeSavedArticle(List<String> DOI, Long userID){
        try{
            articlesRepository.removeSavedArticles(DOI, userID);
            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }

}
