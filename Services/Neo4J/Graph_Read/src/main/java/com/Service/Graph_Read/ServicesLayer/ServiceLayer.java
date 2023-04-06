package com.Service.Graph_Read.ServicesLayer;


import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Service.Graph_Read.Repositories.AuthorRepository;
import com.Service.Graph_Read.Repositories.PaperRepository;
import com.Service.Graph_Read.Repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ServiceLayer {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Object> findPapersThatCitePaper(String paperId) {
        return Collections.singletonList(paperRepository.findPapersThatCitePaper(paperId));
    }

    public List<PaperEntity> findPapersThisPaperCited(String paperId) {
        return paperRepository.findPapersThisPaperCited(paperId);
    }

}
