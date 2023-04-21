package com.Write.Service.ServiceLayer;


import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.PaperAuthors;
import com.Write.Service.RepositoryLayer.ArticlesRepository;
import com.Write.Service.RepositoryLayer.PaperAuthorsRepository;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaperAuthorsService {

    @Autowired
    private PaperAuthorsRepository paperAuthorsRepository;
    @Autowired
    private PublisherRepository  publisherRepository;

    @Autowired
    private ArticlesRepository articlesRepository;

    public String saveAuthors(Long publisherID, List<String> articleIDs){

        Publisher publisher = publisherRepository.findById(publisherID).get();
        List<PaperAuthors> paperAuthors = new ArrayList<>();
        for(String articleID: articleIDs){
            Articles article = articlesRepository.findById(articleID).get();
            PaperAuthors paperAuthor = new PaperAuthors(article, publisher);
            paperAuthors.add(paperAuthor);
        }
        try{
            paperAuthorsRepository.saveAll(paperAuthors);
            return "OK";
        }
        catch (Exception exception){
            return "Error";
        }
    }
    @Transactional
    public String deleteAuthor(Long publisherID, List<String> articleIDs){
        try{
            paperAuthorsRepository.deleteEntity(articleIDs, publisherID);
            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }

}
