package com.Write.Service.ServiceLayer;


import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.PaperAuthors;
import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.Write.Service.RepositoryLayer.ArticlesRepository;
import com.Write.Service.RepositoryLayer.PaperAuthorsRepository;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaperAuthorsService {

    @Value("${cloud.API-Gateway.URL}")
    private String API_gateway_URL;
    @Value("${GRAPH-WRITE-SERVICE}")
    private String Graph_Write_Service;
    @Value("${SOLR-WRITE-SERVICE}")
    private String Solr_Write_Service;

    @Value("${KNOWLEDGEVERSE-MYSQL-READING-ENTITY}")
    private String MYSQL_READING_ENTITY;
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
            RestTemplate restTemplate = new RestTemplate();

            for(String articleID: articleIDs){
                PaperEntity paperEntity = new PaperEntity(articleID);
                var  authors = new ArrayList<AuthorEntity>();
                authors.add(new AuthorEntity(publisher.getPublisherID(), publisher.getPublisherName()));
                paperEntity.setAuthors(authors);
                restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/savePaper", paperEntity, PaperEntity.class);
            }
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
            RestTemplate restTemplate = new RestTemplate();
            HashMap<String, Object> hashMap = new HashMap<String, Object>();
            hashMap.put("DOI", articleIDs);
            restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/deletePaperAuthorsList", hashMap, Void.class);

            /*
            For Deleting Paper Authors from Solr Engine
             */
//            for(String article: articleIDs){
//                ResponseEntity<List<List<Object>>> responseEntityTopics = restTemplate.exchange(
//                        API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleTopicsWithID?DOI=" + article,
//                        HttpMethod.GET,
//                        null,
//                        new ParameterizedTypeReference<>() {
//                        });
//                List<List<Object>> topics = responseEntityTopics.getBody();
//                List<String> topicsList = topics.stream()
//                        .map(obList -> (String) obList.get(1))
//                        .toList();
//
//                restTemplate.postForEntity(API_gateway_URL+"/"+Solr_Write_Service+"/saveCloudDocument", hashMap, String.class);
//
//
//            }

            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }

}
