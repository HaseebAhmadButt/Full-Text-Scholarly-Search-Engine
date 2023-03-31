package com.Read.Service.ServiceLayer;


import com.Read.Service.RepositoryLayer.ArticlesTopicsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticlesTopicService {

    @Autowired
    private ArticlesTopicsRepository articlesTopicsRepository;
    public List<String> top10Topics(){
        return articlesTopicsRepository.findTopResearchTopics();
    }
}
