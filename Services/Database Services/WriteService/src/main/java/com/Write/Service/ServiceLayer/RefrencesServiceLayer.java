package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.References;
import com.Write.Service.RepositoryLayer.RefrencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RefrencesServiceLayer {

    @Autowired
    private RefrencesRepository refrencesRepository;

    @Autowired
    private ArticlesService articlesService;

    public void saveRefrences(Articles article1, Articles[] articlesList){
        List<References> references = new ArrayList<>();
        for (Articles article: articlesList){
            article1 = articlesService.FindOrCreateArticle(article1.getPaper_DOI(), article1.getPaper_Title());
            Articles article2 = articlesService.FindOrCreateArticle(article.getPaper_DOI(), article.getPaper_Title());
            references.add(new References(article1, article2));
        }
        refrencesRepository.saveAll(references);
    }

    public void saveRefrence(Articles article1, Articles article2){
        article1 = articlesService.FindOrCreateArticle(article1.getPaper_DOI(), article1.getPaper_Title());
        article2 = articlesService.FindOrCreateArticle(article2.getPaper_DOI(), article2.getPaper_Title());
        if(article1!=null && article2 !=null) refrencesRepository.save(new References(article1, article2));

    }
}
