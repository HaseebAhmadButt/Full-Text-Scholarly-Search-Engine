package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;

import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Write.Service.RepositoryLayer.AdminRepository;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import com.Write.Service.RepositoryLayer.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class AdminService {

    @Value("${cloud.API-Gateway.URL}")
    private String API_gateway_URL;
    @Value("${GRAPH-WRITE-SERVICE}")
    private String Graph_Write_Service;
    @Value("${SOLR-WRITE-SERVICE}")
    private String Solr_Write_Service;

    @Value("${KNOWLEDGEVERSE-MYSQL-READING-ENTITY}")
    private String MYSQL_READING_ENTITY;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private AddedArticlesService addedarticlesService;

    @Autowired
    private BlockedAuthorService blockedAuthorService;

    @Autowired
    private ArticlesService articlesService;

    @Autowired
    private DeletedArticlesService deletedArticlesService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    public Admin saveAdmin(User userID){
        Admin admin = new Admin(userID);
        return adminRepository.save(admin);
    }

//    To block publishers/authors
    public String blockAuthors(Long AuthorID, Long AdminID){
        try{
            User admin = userRepository.findById(AdminID).get();
            Publisher publisher = publisherService.getPublisher(AuthorID);
            publisher.setPublisherStatus("BLOCKED");
            publisherRepository.save(publisher);
            blockedAuthorService.setBlockedAuthorsRepository(publisher, admin);
            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }

    public String removeBlockAuthor(Long AuthorID){
        try{
            Publisher publisher = publisherService.getPublisher(AuthorID);
            publisher.setPublisherStatus("ACTIVE");
            System.out.println("publisher = " + publisher);
            Publisher publisher1 = publisherRepository.save(publisher);
            System.out.println("publisher1 = " + publisher1);
            blockedAuthorService.removeBlockedAuthors(publisher);
            return "OK";
        }
        catch (Exception e){
            return "Error";
        }
    }

//    On the Admin Control side. Under the "Update Articles" heading, whenever a user uploads a new article
//    it will be stored with the status of "In-Progress" and when admin chnages its status to
//    "Accepted", it will move to added articles and if it changes the status to "Rejected".
//    It will move to Deleted Articles.
//    There is need for adding new field with title "Added Articles", which will only contain those articles
//    which have been accepted before.
//    So, here is the structure of subheadings of "Update Articles"
//    1. Add Articles ==> Articles which are uploaded by the authors but are not noted by the admin means they have "In-Progress" status
//    2. Added Articles ==> Articles which are accepted by the admin
//    3. Deleted Articles => Articles which are rejected by the admin
    public void addedArticles(String DOI, Long AdminID) {
        User admin = userRepository.findById(AdminID).get();
        Articles article = articlesService.getArticleByID(DOI);
        addedarticlesService.addArticles(admin,article);
        deletedArticlesService.removeArticlesFromRejected(DOI, AdminID);
        articlesService.UpdatePaperStatus(DOI, "ACCEPTED");

        List<String> authorNames = new ArrayList<>();
        List<String> topics = new ArrayList<>();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<List<Object>>> responseEntity = restTemplate.exchange(
                API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleAuthors?DOI=" + article.getPaper_DOI(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                });
        List<List<Object>> responseList = responseEntity.getBody();
        PaperEntity paperEntity = new PaperEntity();
        paperEntity.setPaperId(article.getPaper_DOI());
        List<AuthorEntity> authorEntity = new ArrayList<>();
        //Creating Author Lists to send
        assert responseList != null;
        for (List<Object> obList: responseList){
            Long id = Long.valueOf((Integer) obList.get(0));
            String authorName = (String) obList.get(1);
            authorEntity.add(new AuthorEntity(id, authorName));
            authorNames.add(authorName);
        }
        ResponseEntity<List<List<Object>>> responseEntityTopics = restTemplate.exchange(
                API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleTopicsWithID?DOI=" + article.getPaper_DOI(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                });
        List<List<Object>> responseListTopic = responseEntityTopics.getBody();
        List<TopicEntity> topicEntity = new ArrayList<>();

        for (List<Object> obList: responseListTopic){
            Long id = Long.valueOf((Integer) obList.get(0));
            String topic = (String) obList.get(1);
            topicEntity.add(new TopicEntity(id, topic));
            topics.add(topic);
        }
        paperEntity.setAuthors(authorEntity);
        paperEntity.setTopic(topicEntity);
        restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/savePaper", paperEntity, PaperEntity.class);


//        JSON Receivable:
//        {
//            "id": "12345/10.98.23",
//                "title": "Testing Paper 3",
//                "abstractText": "This is an example of paper abstract.",
//                "published_Date": "2022",
//                "journalName":"Journal Name",
//                "authorList": ["Author 1", "Author 2"],
//            "topicsList": ["Natural Language Processing", "Artificial Intelligence"]
//        }
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("id", article.getPaper_DOI());
        hashMap.put("title", article.getPaper_Title());
        hashMap.put("abstractText", article.getPaper_Abstract());
        hashMap.put("published_Date", Long.valueOf(article.getPublished_Date()));
        hashMap.put("journalName", article.getPaper_Journal().getJournalName());
        hashMap.put("authorList", article.getAuthors());
        hashMap.put("topicsList", topics);
        restTemplate.postForEntity(API_gateway_URL+"/"+Solr_Write_Service+"/saveCloudDocument", hashMap, String.class);
    }

//    public void rejectedArticles(String DOI, Long AdminID, String reason){
//
//        User admin = userRepository.findById(AdminID).get();
//        Articles article = articlesService.getArticleByID(DOI);
//        var restTemplate =  new RestTemplate();
//
//        ResponseEntity<List<List<Object>>> responseEntityTopics = restTemplate.exchange(
//                API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleTopicsWithID?DOI=" + article.getPaper_DOI(),
//                HttpMethod.GET,
//                null,
//                new ParameterizedTypeReference<>() {
//                });
//
//        List<List<Object>> responseListTopic = responseEntityTopics.getBody();
//        List<String> topics = new ArrayList<>();
//
//        for (List<Object> obList: responseListTopic){
//            String topic = (String) obList.get(1);
//            topics.add(topic);
//        }
//        deletedArticlesService.rejectArticles(admin,article,reason);
//        addedarticlesService.removeArticlesFromAdded(DOI,AdminID);
//        articlesService.UpdatePaperStatus(DOI, "REJECTED");
//
//        var payload = new HashMap<String, String>();
//        payload.put("DOI",DOI);
//        restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/deletePaper",payload,String.class);
//
//        var SolrPayload = new HashMap<String, Object>();
//        SolrPayload.put("documentID",DOI);
//        SolrPayload.put("topics",topics);
//        restTemplate.postForEntity(API_gateway_URL+"/"+Solr_Write_Service+"/deleteCloudDocument",SolrPayload,String.class);
//
//    }
    public void rejectedArticles(String DOI, Long AdminID, String reason) {
    User admin = userRepository.findById(AdminID).get();
    Articles article = articlesService.getArticleByID(DOI);

    // Define the executor service with a fixed number of threads
    ExecutorService executor = Executors.newFixedThreadPool(2);

    // Submit two tasks to the executor service
    Future<List<String>> topicsFuture = executor.submit(() -> {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<List<Object>>> responseEntityTopics = restTemplate.exchange(
                API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleTopicsWithID?DOI=" + article.getPaper_DOI(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        List<List<Object>> responseListTopic = responseEntityTopics.getBody();
        List<String> topics = new ArrayList<>();

        assert responseListTopic != null;
        for (List<Object> obList: responseListTopic) {
            String topic = (String) obList.get(1);
            topics.add(topic);
        }

        return topics;
    });

    Future<Void> deleteFuture = executor.submit(() -> {
        RestTemplate restTemplate = new RestTemplate();

        // Delete the article from the graph database
        Map<String, String> payload = new HashMap<>();
        payload.put("DOI", DOI);
        restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/deletePaper",payload,String.class);

        // Delete the article from the Solr search engine
        Map<String, Object> SolrPayload = new HashMap<>();
        SolrPayload.put("documentID", DOI);
        SolrPayload.put("topics", topicsFuture.get());
        restTemplate.postForEntity(API_gateway_URL+"/"+Solr_Write_Service+"/deleteCloudDocument",SolrPayload,String.class);

        return null;
    });

    try {
        // Wait for both tasks to complete
        topicsFuture.get();
        deleteFuture.get();
    } catch (InterruptedException | ExecutionException e) {
        // Handle exceptions
    }

    // Delete the article from the local database and update its status
    deletedArticlesService.rejectArticles(admin,article,reason);
    addedarticlesService.removeArticlesFromAdded(DOI,AdminID);
    articlesService.UpdatePaperStatus(DOI, "REJECTED");

    // Shutdown the executor service
    executor.shutdown();
}
    public void rejectArticle(String DOI, Long AdminID, String reason) {
    User admin = userRepository.findById(AdminID).get();
    Articles article = articlesService.getArticleByID(DOI);
    // Delete the article from the local database and update its status
    deletedArticlesService.rejectArticles(admin,article,reason);
    addedarticlesService.removeArticlesFromAdded(DOI,AdminID);
    articlesService.UpdatePaperStatus(DOI, "REJECTED");

}

}

