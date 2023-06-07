package com.Solr.ReadService.ServiceLayer;


//import com.Solr.ReadService.Component.SolrCloudClientFactory;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class CloudServiceLayer {

    @Value("${topic.list.API}")
    private String topicAPIURL;
    @Value("${graph.API}")
    private String graphReadAPIURL;
    @Value("${search.end.point}")
    private String searchEndPoint;
    @Value("${query.generation.API}")
    private String queryGenerationAPI;



//    @Autowired
//    private SolrCloudClientFactory solrCloudClientFactory;


    public List<HashMap<String, Object>> getRelatedArticles(String paragraph) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        String url = queryGenerationAPI;
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("paragraph", paragraph);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<List<String>> response = restTemplate.exchange(url, HttpMethod.POST, request, new ParameterizedTypeReference<List<String>>() {});
        List<String> generatedQuestions = response.getBody();
        String selectedQuestion = (generatedQuestions.size() == 2) ? generatedQuestions.get(1) : generatedQuestions.get(0);

        return getSolrDocuments(selectedQuestion,10);
    }

    public List<HashMap<String, Object>> getSolrDocuments(String query, int rows) throws JsonProcessingException {
        JSONArray solrDocuments = getDocuments(query, rows);
        // Step 1: Calculate new score and sum
        double sumNewScore = 0.0;
        List<String> stringList = new ArrayList<>();
        for (int i = 0; i < solrDocuments.length(); i++) {
            JSONObject document = solrDocuments.getJSONObject(i);
            stringList.add(document.getString("id"));
            double relevanceScore = document.getDouble("score");
            int publishedYear = document.getInt("Published_Date");
            double newScore = (0.8 * (relevanceScore+0.01)) + (0.2 * (1.0 / (Calendar.getInstance().get(Calendar.YEAR) - publishedYear)+1));
            sumNewScore += newScore;
            document.put("score", newScore);
        }
        System.out.println("solrDocuments = " + solrDocuments);

        RestTemplate restTemplate = new RestTemplate();
        ParameterizedTypeReference<List<Map<String, Object>>> responseType = new ParameterizedTypeReference<>() {};
        ResponseEntity<List<Map<String, Object>>> responseEntity = restTemplate.exchange(
                graphReadAPIURL,
                HttpMethod.POST,
                new HttpEntity(stringList),
                responseType
        );

        if(responseEntity.getStatusCode().is2xxSuccessful()) {
            System.out.println("stringList = " + stringList);
            System.out.println("solrDocuments.length() = " + solrDocuments.length());
            List<Map<String, Object>> articleRankScores = responseEntity.getBody();
            System.out.println("articleRankScores = " + articleRankScores);

            for (int i = 0; i < solrDocuments.length(); i++) {
                JSONObject document = solrDocuments.getJSONObject(i);
                double newScore = document.getDouble("score");
                // Step 3: Calculate final score with citation
//                String id = document.getString("id");
                String id = stringList.get(i);
                double citationScore = 0;
                for (Map<String, Object> articleRankScore : articleRankScores) {
                    if (id.equals(articleRankScore.get("paperId"))) {
//                        citationScore = (double) articleRankScore.get("articleRank");
                        Object articleRankValue = articleRankScore.get("articleRank");
                        citationScore = (articleRankValue != null) ? (double) articleRankValue : 0;

                        break;
                    }
                }
                double finalScore = (0.2 * citationScore) + (0.8 *(newScore/ (sumNewScore +1)));
                document.put("score", finalScore);
            }
        }
        // Step 4: Sort documents by final score
        List<JSONObject> jsonObjectList = new ArrayList<>();
        for (int i = 0; i < solrDocuments.length(); i++) {
            jsonObjectList.add(solrDocuments.getJSONObject(i));
        }

        jsonObjectList.sort((o1, o2) -> Double.compare(o2.getDouble("score"), o1.getDouble("score")));
//        List<HashMap<String, Object>> maps = new ArrayList<>();
//        for(JSONObject jsonObject: jsonObjectList){
//            HashMap<String, Object> hashMap = new HashMap<>();
//            hashMap.put("ID", jsonObject.getString("id"));
//            hashMap.put("Title", jsonObject.getString("Title"));
//            hashMap.put("Abstract", jsonObject.getString("Abstract"));
//            hashMap.put("Published_Date", jsonObject.getLong("Published_Date"));
//            hashMap.put("JournalName", jsonObject.getString("Journal_Name"));
//            JSONArray authors = jsonObject.getJSONArray("Authors_List");
//            hashMap.put("Authors_List", IntStream.range(0, authors.length())
//                    .mapToObj(authors::getString)
//                    .collect(Collectors.toList()));
//            JSONArray topics = jsonObject.getJSONArray("Topics_List");
//            hashMap.put("Topics_List", IntStream.range(0, topics.length())
//                    .mapToObj(topics::getString)
//                    .collect(Collectors.toList()));
//            maps.add(hashMap);
//        }
        List<HashMap<String, Object>> maps = new ArrayList<>();
        for (JSONObject jsonObject : jsonObjectList) {
            HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("ID", jsonObject.getString("id"));
            hashMap.put("Title", jsonObject.getString("Title"));

            // Check if "Abstract" field is present in the JSON object
            if (jsonObject.has("Abstract")) {
                hashMap.put("Abstract", jsonObject.getString("Abstract"));
            } else {
                hashMap.put("Abstract", "Abstract Not Available"); // or you can provide a default value
            }

            hashMap.put("Published_Date", jsonObject.getLong("Published_Date"));
            hashMap.put("JournalName", jsonObject.getString("Journal_Name"));

            JSONArray authors = jsonObject.getJSONArray("Authors_List");
            hashMap.put("Authors_List", IntStream.range(0, authors.length())
                    .mapToObj(authors::getString)
                    .collect(Collectors.toList()));

            JSONArray topics = jsonObject.getJSONArray("Topics_List");
            hashMap.put("Topics_List", IntStream.range(0, topics.length())
                    .mapToObj(topics::getString)
                    .collect(Collectors.toList()));

            maps.add(hashMap);
        }
        return maps;
//        if(solrDocuments.size() == 0){return solrDocuments;}
//        else{
//            List<String> stringList = new ArrayList<>();
//            for(SolrDocument document : solrDocuments)
//            {
//                stringList.add((String) document.getFieldValue("id"));
//            }
//            RestTemplate restTemplate = new RestTemplate();
//            ParameterizedTypeReference<List<Double>> responseType = new ParameterizedTypeReference<>() {};
//            ResponseEntity<List<Double>> responseEntity = restTemplate.exchange(
//                    graphReadAPIURL,
//                    HttpMethod.POST,
//                    new HttpEntity(stringList),
//                    responseType
//            );
//
//            if(responseEntity.getStatusCode().is2xxSuccessful()) {
//                List<Double> articleRankScores = responseEntity.getBody();
//                float sumRelevanceScores = 0;
//                for (SolrDocument document : solrDocuments) {
//                    float relevanceScore = (float) document.getFieldValue("score");
//                    sumRelevanceScores += relevanceScore;
//                }
//                List<Float> finalScores = new ArrayList<>();
//                for (int i = 0; i < articleRankScores.size(); i++) {
//                    float finalScore = (float) (0.4 * articleRankScores.get(i) + 0.6 *
//                            ((float) solrDocuments.get(i).getFieldValue("score") / sumRelevanceScores));
//                    solrDocuments.get(i).setField("score", finalScore);
//                    finalScores.add(finalScore);
//                }
//                List<SolrDocument> sortedDocuments = new ArrayList<>(solrDocuments);
//                sortedDocuments.sort((d1, d2) -> Float.compare(finalScores.get(solrDocuments.indexOf(d2)), finalScores.get(solrDocuments.indexOf(d1))));
//            }
//            return solrDocuments;
//            return null;
        }
//    }


    private JSONArray getDocuments(String query, int rows) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = searchEndPoint;

        JSONObject requestBody = new JSONObject();
        requestBody.put("query", query);
        requestBody.put("rows", rows);

        HttpEntity<String> request = new HttpEntity<String>(requestBody.toString(), headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                String.class
        );

        return new JSONArray(response.getBody());

//                List<String> collectionList = matchCollectionList(query);
//                List<SolrDocument> resultsList = Collections.synchronizedList(new ArrayList<>());
//                Set<String> resultSet = Collections.synchronizedSet(new HashSet<>());
//
//                List<Thread> threads = new ArrayList<>();
//
//            for (String collectionName : collectionList) {
//                solrRecordFetchingClass thread = new solrRecordFetchingClass(query, collectionName, resultsList, solrCloudClientFactory, resultSet);
//                System.out.println("Thread Created");
//                threads.add(thread);
//                System.out.println("Thread Added");
//                thread.start();
//            }
//            // Wait for all threads to finish
//            for (Thread thread : threads) {
//                try {
//                    thread.join();
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//            }
//            return resultsList;

//        return null;
    }
//
//    private String getCollectionName(String name){
//        return name
//                .toLowerCase()
//                .replaceAll(" ", "_")
//                .replaceAll("[^a-zA-Z0-9\\\\s]", "");
//    }
//    private List<String> matchCollectionList(String query){
//        List<String> collections = solrCloudClientFactory.getCollectionList();
//        Map<String, Object> payload = new HashMap<>();
//        payload.put("new_topic", query);
//        payload.put("topics", collections);
//        payload.put("top_k", 5);
//
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
//
//        ResponseEntity<Map<String, Double>> responseEntity =
//                restTemplate
//                        .exchange(
//                                topicAPIURL,
//                                HttpMethod.POST,
//                                request,
//                                new ParameterizedTypeReference<>() {
//                                }
//                        );
//        Set<String> resultMap = responseEntity.getBody().keySet();
//        System.out.println("resultMap = " + resultMap);
//        return new ArrayList<>(resultMap);
//    }
//    public List<String> collectionList(){
//        return solrCloudClientFactory.getCollectionList();
////        System.out.println("collectionList = " + collectionList);
//    }
//}
//
//class solrRecordFetchingClass extends Thread{
//
//    private final SolrCloudClientFactory solrCloudClientFactory;
//    private final String query;
//    private final String collectionName;
//    private final List<SolrDocument> resultsList;
//
//    private Set<String> hashString;
//    solrRecordFetchingClass(
//            String query, String collectionName, List<SolrDocument> resultsList, SolrCloudClientFactory solrCloudClientFactory, Set<String> hasStrings
//    ){
//        this.query = query;
//        this.collectionName = collectionName;
//        this.resultsList = resultsList;
//        this.solrCloudClientFactory = solrCloudClientFactory;
//        this.hashString = hasStrings;
//    }
//    @Override
//    public void run(){
//        SolrClient solrClient = solrCloudClientFactory.solrClient(collectionName);
//        SolrQuery solrQuery = new SolrQuery();
//        solrQuery.setQuery(query);
//        solrQuery.set("defType", "edismax");
//        solrQuery.set("fl", "*,score");
//        solrQuery.setRows(50);
//
//        // Set query parameters   journalName^2
//        solrQuery.set("qf", "title^10 abstractText^5"); // Query fields and their boosting factors  abstract^2 authors^2
//        solrQuery.set("pf", "title^10"); // Phrase fields and their boosting factors  abstract^5
////        solrQuery.set("mm", "50%"); // Minimum match percentage
////        solrQuery.set("tie", "0.1"); // Tiebreaker between the query terms and the phrase
////        This boost parameter will calculate the final score of each document by adding the product of the relevance score and 0.8 with the product of the inverse of the publication year and 0.2.
//        solrQuery.set("boost", "sum(product(query($qf),0.8),product(recip(sub(" + Calendar.getInstance().get(Calendar.YEAR) + ",publishedDate),1,1,0.2),0.2))");
//
//        QueryResponse response = null;
//        try {
//            response = solrClient.query(solrQuery);
//
//        } catch (SolrServerException | IOException | SolrException e) {
////            throw new RuntimeException(e);
//        }
//        if(response!=null){
//            SolrDocumentList documentList = response.getResults();
//            synchronized (resultsList) {
//                for (SolrDocument solrDocument : documentList) {
//                    if (!hashString.contains((String) solrDocument.getFieldValue("id"))) {
//                        resultsList.add(solrDocument);
//                        hashString.add((String) solrDocument.getFieldValue("id"));
//                    }
//                }
//            }
//        }
//    }
}