package com.Service.Graph_Write.ServicesLayer;


import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Service.Graph_Write.Repositories.AuthorRepository;
import com.Service.Graph_Write.Repositories.PaperRepository;
import com.Service.Graph_Write.Repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceLayer {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private TopicRepository topicRepository;

    public PaperEntity savePaper(PaperEntity paperEntity){
        return paperRepository.save(paperEntity);
    }

    public List<PaperEntity> savePaper(List<PaperEntity> paperEntity){
        return paperRepository.saveAll(paperEntity);
    }

    public TopicEntity saveTopicEntity(TopicEntity topicEntity){
        return topicRepository.save(topicEntity);
    }

    public AuthorEntity saveAuthorEntity(AuthorEntity authorEntity){
        return authorRepository.save(authorEntity);
    }

}
