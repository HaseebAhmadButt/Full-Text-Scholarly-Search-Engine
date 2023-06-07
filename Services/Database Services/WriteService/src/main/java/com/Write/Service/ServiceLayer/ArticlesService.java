package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Journal;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Write.Service.RepositoryLayer.ArticlesRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.*;

import java.util.*;

@Service
public class ArticlesService {

    @Value("${topic.server.address}")
    private String topicServerAddress;
    @Value("${cloud.API-Gateway.URL}")
    private String API_gateway_URL;
    @Value("${GRAPH-WRITE-SERVICE}")
    private String Graph_Write_Service;
    @Value("${SOLR-WRITE-SERVICE}")
    private String Solr_Write_Service;

    @Value("${KNOWLEDGEVERSE-MYSQL-READING-ENTITY}")
    private String MYSQL_READING_ENTITY;
    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private JournalService journalService;

    @Autowired
    private ArticlesTopicService articlesTopicService;

    @Autowired
    private PaperAuthorsService paperAuthorsService;


    public Articles getArticleByID(String DOI){
        return articlesRepository.findById(DOI).get();
    }

    public Articles FindOrCreateArticle(String DOI, String Title){
        Articles article = this.getArticleByID(DOI);
        if(article==null){
           article = this.savePaperWithDefaultFields(DOI, Title);
        }
        return articlesRepository.save(article);
    }
    public Articles savePaperWithDefaultFields(String DOI, String Title){
        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_STATUS("ACCEPTED");
        return articlesRepository.save(articles);
//        if(articles1==null){
//            return "FAILED";
//        }
//        return "OK";
    }
    public String UpdatePaperAbstract(String DOI, String Abstract){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_Abstract(Abstract);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperYear(String DOI, String Year){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPublished_Date(Year);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperURL(String DOI, String URL){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_URL(URL);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperStatus(String DOI, String Status){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_STATUS(Status);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperJournal(String DOI, String JournalName){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        Journal journal = journalService.FindOrCreateJournal(JournalName.trim());
        articles.setPaper_Journal(journal);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String savePaperCompleteFromCrawler(
            String DOI,
            String Title,
            String Abstract,
            String Year,
            String Link,
            String JournalName,
            List<String> topics){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("ACCEPTED");
        articles.setPAPER_UPDATE_TYPE("CRAWLED");
        return getString(JournalName, articles, getTopicsList(Title+" "+Abstract));
    }

    public String savePaperCompleteFromUser(String DOI,
                                            String Title,
                                            String Abstract,
                                            String Year,
                                            String JournalName,
                                            List<String> authors){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("IN-PROGRESS");
        articles.setPAPER_UPDATE_TYPE("UPLOADED");
        articles.setAuthors(authors);
        return getString(JournalName, articles, getTopicsList(Title+" "+Abstract));
    }




    public String saveSamplePaperCompleteFromUser(String DOI,
                                            String Title,
                                            String Abstract,
                                            String Year,
                                            String JournalName,
                                            List<String> authors){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("ACCEPTED");
        articles.setPAPER_UPDATE_TYPE("CRAWLED");
        articles.setAuthors(authors);

        List<String> topicsList = getTopicsList(Title+" "+Abstract);

        String str =  getString(JournalName, articles, topicsList);
//        RestTemplate restTemplate = new RestTemplate();
//
//        PaperEntity paperEntity = new PaperEntity();
//        paperEntity.setPaperId(DOI);
//        ResponseEntity<List<List<Object>>> responseEntityTopics = restTemplate.exchange(
//                API_gateway_URL+"/"+MYSQL_READING_ENTITY+"/getArticleTopicsWithID?DOI=" + DOI,
//                HttpMethod.GET,
//                null,
//                new ParameterizedTypeReference<>() {
//                });
//        List<List<Object>> responseListTopic = responseEntityTopics.getBody();
//        List<TopicEntity> topicEntity = new ArrayList<>();
//
//        for (List<Object> obList: responseListTopic){
//            Long id = Long.valueOf((Integer) obList.get(0));
//            String topic = (String) obList.get(1);
//            topicEntity.add(new TopicEntity(id, topic));
//        }
//        paperEntity.setTopic(topicEntity);
//        restTemplate.postForEntity(API_gateway_URL+"/"+Graph_Write_Service+"/savePaper", paperEntity, PaperEntity.class);
//        HashMap<String, Object> hashMap = new HashMap<>();
//        hashMap.put("id", articles.getPaper_DOI());
//        hashMap.put("title", articles.getPaper_Title());
//        hashMap.put("abstractText", articles.getPaper_Abstract());
//        hashMap.put("published_Date", Long.valueOf(articles.getPublished_Date()));
//        hashMap.put("journalName", JournalName);
//        hashMap.put("authorList", articles.getAuthors());
//        hashMap.put("topicsList", topicsList);
//        restTemplate.postForEntity(API_gateway_URL+"/"+Solr_Write_Service+"/saveCloudDocument", hashMap, String.class);


//        return str;
        return "OK";
    }






    public String savePaperCompleteFromUserUpload(Long authorID, String DOI, String Title, String Abstract, String Year, String pdf_name ,String JournalName, List<String> authors){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("IN-PROGRESS");
        articles.setPAPER_UPDATE_TYPE("UPLOADED");
        articles.setPAPER_PDF(pdf_name);
        articles.setAuthors(authors);
        getString(JournalName, articles, getTopicsList(Title+" "+Abstract));
        return paperAuthorsService.saveAuthors(authorID, Collections.singletonList(DOI));
    }

    @NotNull
    private String getString( String JournalName, Articles articles, List<String> topics) {
        if(JournalName.equals("")){
            articles.setPaper_Journal(null);
        }
        else {
            Journal journal = journalService.FindOrCreateJournal(JournalName);
            articles.setPaper_Journal(journal);
        }
        articlesRepository.save(articles);
        articlesTopicService.saveArticles(topics,articles);

        return "OK";
    }

    private List<String> getTopicsList(String passage) {
        RestTemplate restTemplate = new RestTemplate();
        // Set the URL endpoint and parameters
        String url = topicServerAddress + "/extract_topic";
        int numTopics = 2;
        int numWords = 2;
        String fullUrl = String.format("%s/?paragraph=%s&num_topics=%d&num_words=%d", url, passage, numTopics, numWords);

        // Make the GET request and retrieve the response as a string
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(fullUrl, String.class);
        // Print the response JSON string (for debugging purposes)
        JSONObject responseJson = new JSONObject(responseEntity.getBody());

        List<String> topicsList = new ArrayList<>();
        // Loop through each array in the response and extract the words and probabilities
        for (String key : responseJson.keySet()) {
            JSONArray array = responseJson.getJSONArray(key);
            for (int i = 0; i < array.length(); i++) {
                JSONObject obj = array.getJSONObject(i);
                String word = obj.getString("word");
                double probability = obj.getDouble("probability");
                String topic = word.toUpperCase();

                // Check if topic already exists in topicsList
                boolean exists = false;
                for (String existingTopic : topicsList) {
                    if (existingTopic.contains(topic)) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    topicsList.add(topic);
                }
            }
        }
        return topicsList;
    }



}
