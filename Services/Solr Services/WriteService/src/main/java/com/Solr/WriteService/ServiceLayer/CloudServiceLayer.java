package com.Solr.WriteService.ServiceLayer;


//import com.Solr.WriteService.Component.SolrCloudClientFactory;
import com.Solr.WriteService.model.Paper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.request.UpdateRequest;
import org.apache.solr.client.solrj.request.schema.SchemaRequest;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@Service
public class CloudServiceLayer {

//    @Value("${collection.shards}")
//    private int totalShards;
//    @Value("${collection.replicas}")
//    private int totalReplicas;
//    @Value("${collection.configuration}")
//    private String collectionConfigurations;
//    @Value("${collection.AutoReplicas}")
//    private boolean autoReplicas;
//    @Value("${collection.MaxShardsPerNode}")
//    private int maxShardsPerNode;
    @Value("${index-data-URL}")
    private String indexURI;
    @Value("${delete-data-URL}")
    private String deleteURI;
//    @Autowired
//    private SolrCloudClientFactory solrCloudClientFactory;

    public ResponseEntity<Object> saveDocument(Paper paper) {
        /*
        {
        "id": "D10-1001",
        "Authors_List": [
            "Rush, Alexander M.",
            "Sontag, David",
            "Collins, Michael John",
            "Jaakkola, Tommi"
        ],
        "Title": "On Dual Decomposition and Linear Programming Relaxations for Natural Language Processing",
        "Journal_Name": "EMNLP",
        "Abstract": "This paper introduces dual decomposition as a framework for deriving inference algorithms for NLP problems. The approach relies on standard dynamic-programming algorithms as oracle solvers for sub-problems, together with a simple method for forcing agreement be- tween the different oracles. The approach provably solves a linear programming (LP) re- laxation of the global inference problem. It leads to algorithms that are simple, in that they use existing decoding algorithms; efficient, in that they avoid exact algorithms for the full model; and often exact, in that empirically they often recover the correct solution in spite of using an LP relaxation. We give experimen- tal results on two problems: 1) the combina- tion of two lexicalized parsing models; and",
        "Published_Date": 2010.0
    }
         */
        try {


            RestTemplate restTemplate = new RestTemplate();
            String uri = indexURI; // replace with your URI

// create payload map with dynamic values
            Map<String, Object> payload = new HashMap<>();
            payload.put("id", paper.getId());
            payload.put("Authors_List", paper.getAuthorList());
            payload.put("Title", paper.getTitle());
            payload.put("Journal_Name", paper.getJournalName());
            payload.put("Abstract", paper.getAbstractText());
            payload.put("Published_Date", paper.getPublished_Date());
            payload.put("Topics_List", paper.getTopicsList());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
// Create the request entity with headers and payload
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

// Send the POST request and get the response
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(uri, requestEntity, String.class);

// Parse the response string into a JSON object using Jackson
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(responseEntity.getBody());

// Extract the "message" field from the JSON object
            String message = responseJson.get("message").asText();

            System.out.println(message);


//            List<String> articleTopics = checkCollectionList(paper.getTopicsList());
//            for (String articleTopic : paper.getTopicsList()) {
//                if (articleTopics.contains(getCollectionName(articleTopic))) {
//                    createNewCollection(articleTopic);
//                }
//                saveArticle(paper, getCollectionName(articleTopic));
//            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    private void saveArticle(Paper paper, String articleTopic) throws SolrServerException, IOException {
//        SolrClient solrClient = solrCloudClientFactory.solrClient(articleTopic);
//        createSolrDocument(paper, solrClient);
//    }
//    static void createSolrDocument(Paper paper, SolrClient solrClient) throws SolrServerException, IOException {
//        SolrInputDocument document = new SolrInputDocument();
//        document.addField("id", paper.getId());
//        document.addField("title", paper.getTitle());
//        document.addField("abstractText", paper.getAbstractText());
//        document.addField("publishedDate", Long.valueOf(paper.getPublished_Date()));
//        document.addField("journalName", paper.getJournalName());
//        document.addField("authorList", paper.getAuthorList());
//        document.addField("topicsList", paper.getTopicsList());
//
//        solrClient.add(document);
//        solrClient.commit();
//    }
//
//    private List<String> checkCollectionList(Set<String> topics){
//        List<String> stringList = new ArrayList<>();
//        List<String> existingCores = solrCloudClientFactory.getCollectionList();
//        for(String topic: topics){
//            String t = getCollectionName(topic);
//            if(existingCores.contains(t));
//            else stringList.add(t);
//        }
//        return stringList;
//    }
//    public void createNewCollection(String newCollectionName) throws SolrServerException, IOException {
//        String collectionName = getCollectionName(newCollectionName);
//        // Create collection
//        CollectionAdminRequest.Create createRequest =
//                CollectionAdminRequest.createCollection(
//                        collectionName,
//                        collectionConfigurations,
//                        totalShards,
//                        totalReplicas);
//        createRequest.process(solrCloudClientFactory.solrClient());
//        solrCloudClientFactory.setCollections(collectionName);
//
//        // Add fields to schema
//        SolrClient solrClient = solrCloudClientFactory.solrClient(collectionName);
//        List<Map<String, Object>> fieldMaps = new ArrayList<>();
//        fieldMaps.add(getFieldMap("id", "string", true, true, false));
//        fieldMaps.add(getFieldMap("title", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("abstractText", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("publishedDate", "plong", true, true));
//        fieldMaps.add(getFieldMap("journalName", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("authorList", "text_general", true, true, true));
//        fieldMaps.add(getFieldMap("topicsList", "text_general", true, true, true));
//
//        SchemaRequest.Fields getFieldsRequest = new SchemaRequest.Fields();
//        List<String> existingFieldNames = getFieldsRequest.process(solrClient).getFields().stream()
//                .map(field -> (String) field.get("name"))
//                .toList();
//
//        for (Map<String, Object> fieldMap : fieldMaps) {
//            String fieldName = (String) fieldMap.get("name");
//            if (!existingFieldNames.contains(fieldName)) {
//                SchemaRequest.AddField addFieldRequest = new SchemaRequest.AddField(fieldMap);
//                addFieldRequest.process(solrClient);
//            }
//        }
//    }
//    private Map<String, Object> getFieldMap(String fieldName, String fieldType, boolean indexed, boolean stored, boolean multiValued) {
//        Map<String, Object> fieldMap = new HashMap<>();
//        fieldMap.put("name", fieldName);
//        fieldMap.put("type", fieldType);
//        fieldMap.put("indexed", indexed);
//        fieldMap.put("stored", stored);
//        fieldMap.put("multiValued", multiValued);
//        return fieldMap;
//    }
//    private Map<String, Object> getFieldMap(String fieldName, String fieldType, boolean indexed, boolean stored) {
//        Map<String, Object> fieldMap = new HashMap<>();
//        fieldMap.put("name", fieldName);
//        fieldMap.put("type", fieldType);
//        fieldMap.put("indexed", indexed);
//        fieldMap.put("stored", stored);
//        return fieldMap;
//    }
public ResponseEntity<Object> deleteDocument(String Id, List<String> topics) {
    try {
        RestTemplate restTemplate = new RestTemplate();
        String url = deleteURI + "?id=" + Id; // append the Id to the URL
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        String message = responseEntity.getBody();
        System.out.println(message);

        // code to delete document from Solr collection(s) goes here
        // ...

        return ResponseEntity.ok().build();
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}}

//    public void deleteDocumentById(String id, SolrClient solrClient) throws Exception {
//        try {
//                UpdateRequest updateRequest = new UpdateRequest();
//                updateRequest.deleteById(id);
//                UpdateResponse response = updateRequest.process(solrClient);
//                solrClient.commit();
//                int status = response.getStatus();
//                System.out.println(response.getResponse());
//                if (status != 0) {
//                    throw new Exception("Failed to delete document with ID " + id);
//                }
//        } catch (SolrServerException | IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    //    Overloading above method to receive a list of Papers and store all of those in separate cores ine by one
//    public UpdateResponse saveDocument(List<Paper> papers) throws SolrServerException, IOException {
//        for (Paper paper : papers) {
//            List<String> articleTopics = checkCollectionList(paper.getTopicsList());
//            for (String articleTopic : paper.getTopicsList()) {
//                if (articleTopics.contains(articleTopic)) {
//                    createNewCollection(articleTopic);
//                }
//                saveArticle(paper, articleTopic);
//            }
//        }
//        return new UpdateResponse();
//    }
//    public String getCollectionName(String inputString) {
//        // Convert string to lowercase
//        String formattedString = inputString.toLowerCase();
//        // Replace spaces with underscores
//        formattedString = formattedString.replace(" ", "_");
//        return formattedString;
//    }
//    public void uploadAuthors(String articleDOI, List<String> topics, List<String> authors) throws IOException {
//        for(String topic : topics){
//            String collectionName = getCollectionName(topic);
//            SolrClient solrClient = solrCloudClientFactory.solrClient(collectionName);
//            addingAuthors(solrClient, articleDOI, authors);
//        }
//    }
//    public void deleteAuthors(String articleDOI, List<String> topics, List<String> authors) throws IOException {
//        for(String topic : topics){
//            String collectionName = getCollectionName(topic);
//            SolrClient solrClient = solrCloudClientFactory.solrClient(collectionName);
//            deletingAuthors(solrClient, articleDOI, authors);
//        }
//    }
//    private void addingAuthors(SolrClient client,  String articleDOI, List<String> authors) {
//        SolrInputDocument document = new SolrInputDocument();
//        document.addField("id", articleDOI);
//        document.addField("authorList", authors); // Set the value for the new field
//        try {
//            UpdateResponse response = client.add(document);
//            client.commit(); // Commit the changes to the Solr index
//            System.out.println("New field added to Solr document: " + response);
//        } catch (SolrServerException | IOException e) {
//            e.printStackTrace();
//        }
//    }
//    private void deletingAuthors(SolrClient client,  String articleDOI, List<String> authors) {
//        SolrInputDocument document = new SolrInputDocument();
//        document.addField("id", articleDOI);
//        document.addField("authorList", authors);
//
//        try {
//            UpdateResponse response = client.add(document);
//            client.commit(); // Commit the changes to the Solr index
//            System.out.println("New field added to Solr document: " + response);
//        } catch (SolrServerException | IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//}
