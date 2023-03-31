package com.Write.Service.ControllerLayer;

import com.JPA.Entities.Beans.Articles;
import com.Write.Service.ServiceLayer.RefrencesServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ReferencesController {

    @Autowired
    private RefrencesServiceLayer refrencesServiceLayer;

    public void saveRefrences(@RequestBody Map<String, Object> stringObjectMap){
        Articles articles = (Articles) stringObjectMap.get("citingArticle");
        Articles[] articles1 = (Articles[]) stringObjectMap.get("citedArticles");
        refrencesServiceLayer.saveRefrences(articles,articles1);
    }
    public void saveRefrence(@RequestBody Map<String, Object> stringObjectMap){
        Articles articles = (Articles) stringObjectMap.get("citingArticle");
        Articles articles1 = (Articles) stringObjectMap.get("citedArticle");
        refrencesServiceLayer.saveRefrence(articles,articles1);
    }
}
