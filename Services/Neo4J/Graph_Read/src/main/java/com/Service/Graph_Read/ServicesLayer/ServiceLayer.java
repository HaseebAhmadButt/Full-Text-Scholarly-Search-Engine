package com.Service.Graph_Read.ServicesLayer;


import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Service.Graph_Read.Repositories.AuthorRepository;
import com.Service.Graph_Read.Repositories.PaperRepository;
import com.Service.Graph_Read.Repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ServiceLayer {

    static {
        String projectBaseDir = System.getProperty("project.basedir");
        System.out.println("project.basedir value: " + projectBaseDir);
    }

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Object> findPapersThatCitePaper(String paperId) {
        return Collections.singletonList(paperRepository.findPapersThatCitePaper(paperId));
    }
    public List<List<String>> findIDThatCitePaper(String paperId) {
        return Collections.singletonList(paperRepository.findPapersIDs(paperId));
    }
    public List<PaperEntity> findPapersThisPaperCited(String paperId) {
        return paperRepository.findPapersThisPaperCited(paperId);
    }
    @Scheduled(fixedDelay = 600000) // run every 10 minutes
    public void callMyRepository() {
        paperRepository.createInnerGraph();
        paperRepository.writeScoresToNodes();
        paperRepository.deleteTheGraph();
    }

}
