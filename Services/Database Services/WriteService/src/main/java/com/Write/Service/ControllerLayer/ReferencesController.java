package com.Write.Service.ControllerLayer;

import com.JPA.Entities.Beans.Articles;
import com.Write.Service.ServiceLayer.RefrencesServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin("http://localhost:3000")
public class ReferencesController {

    @Autowired
    private RefrencesServiceLayer refrencesServiceLayer;

    @PostMapping("/createReferencesList")
    public void saveRefrences(@RequestBody Map<String, Object> stringObjectMap){
        Articles articles = (Articles) stringObjectMap.get("citingArticle");
        List<Articles> articles1 = (List<Articles>) stringObjectMap.get("citedArticles");
        refrencesServiceLayer.saveRefrences(articles,articles1);
    }


    @PostMapping("/createReferencesListWithString")
    public void saveReferenceWithString(@RequestBody Map<String, Object> stringObjectMap){
        String articles = (String) stringObjectMap.get("citingArticle");
        List<String> articles1 = (List<String>) stringObjectMap.get("citedArticles");
        refrencesServiceLayer.saveRefrence(articles,articles1);
    }

    @PostMapping("/createReference")
    public void saveRefrence(@RequestBody Map<String, Object> stringObjectMap){
        Articles articles = (Articles) stringObjectMap.get("citingArticle");
        Articles articles1 = (Articles) stringObjectMap.get("citedArticle");
        refrencesServiceLayer.saveRefrence(articles,articles1);
    }
}
