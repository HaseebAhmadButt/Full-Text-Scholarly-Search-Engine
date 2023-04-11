package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.ResearchTopic;
import com.JPA.Entities.CompositBeans.ArticleTopics;
import com.Write.Service.RepositoryLayer.ArticlesTopicsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticlesTopicService {

    @Autowired
    private ArticlesTopicsRepository articlesTopicsRepository;

    @Autowired
    private ResearchTopicService researchTopicService;

//    @Autowired
    private final ArticlesService articlesService = new ArticlesService();

    public void saveArticles(List<String> topics, Articles articles){
        if (topics.size() == 0){
            return;
        }
        List<ArticleTopics> articleTopics = new ArrayList<>();
        for (String topic:topics){
            ResearchTopic researchTopic = researchTopicService.FindOrCreateTopic(topic);
            ArticleTopics articleTopic = new ArticleTopics();
            articleTopic.setTopic(researchTopic);
            articleTopic.setPaper(articles);
            articleTopics.add(articleTopic);
        }
        articlesTopicsRepository.saveAll(articleTopics);
    }

    public String addNewTopic(String topic, String DOI){
        ResearchTopic researchTopic = researchTopicService.FindOrCreateTopic(topic);
        Articles articles = articlesService.getArticleByID(DOI);
        ArticleTopics articleTopic = new ArticleTopics();
        articleTopic.setTopic(researchTopic);
        articleTopic.setPaper(articles);
        ArticleTopics articleTopics = articlesTopicsRepository.save(articleTopic);
        if(articleTopics !=  null){
            return "OK";
        }
        return "FAILED";
    }



}
