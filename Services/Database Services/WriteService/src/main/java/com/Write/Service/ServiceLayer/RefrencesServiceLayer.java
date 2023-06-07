package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.References;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.Write.Service.RepositoryLayer.RefrencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RefrencesServiceLayer {

    @Value("${cloud.API-Gateway.URL}")
    private String apiGateway;
    @Value("${GRAPH-WRITE-SERVICE}")
    private String graphWriteService;


    @Autowired
    private RefrencesRepository refrencesRepository;

    @Autowired
    private ArticlesService articlesService;

    public void saveRefrences(Articles article1, List<Articles> articlesList){
        List<References> references = new ArrayList<>();
        for (Articles article: articlesList){
            article1 = articlesService.FindOrCreateArticle(article1.getPaper_DOI(), article1.getPaper_Title());
            Articles article2 = articlesService.FindOrCreateArticle(article.getPaper_DOI(), article.getPaper_Title());
            references.add(new References(article1, article2));
        }
        refrencesRepository.saveAll(references);
    }


    public void saveRefrence(String article1, List<String> articlesList){
        if(articlesList.size() == 0){ return;}
        List<References> references = new ArrayList<>();
//        List<PaperEntity> paperEntities = new ArrayList<>();
        System.out.println("article1 = " + article1);
        try {
            Articles articles = articlesService.getArticleByID(article1);
            for (String article : articlesList) {
//            paperEntities.add(new PaperEntity(article));
                Articles article2 = articlesService.getArticleByID(article);
                references.add(new References(article2, articles));

            }
            refrencesRepository.saveAll(references);
//        PaperEntity paperEntity = new PaperEntity();
//        paperEntity.setPaperId(article1);
//        paperEntity.setCitingPapers(paperEntities);
//        try{
            var payloadHashMap = new HashMap<String, Object>();
            payloadHashMap.put("paperId", article1);
            payloadHashMap.put("citingPapers", articlesList);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity(apiGateway + "" + "/" + graphWriteService + "/savePaper", payloadHashMap, PaperEntity.class);
        }
        catch (NoSuchElementException e){
            System.out.println("e = " + e);
        }
    }

    public void saveRefrence(Articles article1, Articles article2){
        article1 = articlesService.FindOrCreateArticle(article1.getPaper_DOI(), article1.getPaper_Title());
        article2 = articlesService.FindOrCreateArticle(article2.getPaper_DOI(), article2.getPaper_Title());
        if(article1!=null && article2 !=null) refrencesRepository.save(new References(article1, article2));

    }
}
