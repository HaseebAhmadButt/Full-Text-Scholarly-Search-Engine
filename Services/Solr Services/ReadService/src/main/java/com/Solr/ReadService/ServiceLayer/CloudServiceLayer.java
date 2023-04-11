package com.Solr.ReadService.ServiceLayer;


import com.Solr.ReadService.Component.SolrCloudClientFactory;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class CloudServiceLayer {
    @Value("${collection.shards}")
    private int totalShards;
    @Value("${collection.replicas}")
    private int totalReplicas;
    @Value("${collection.configuration}")
    private String collectionConfigurations;
    @Value("${collection.AutoReplicas}")
    private boolean autoReplicas;
    @Value("${collection.MaxShardsPerNode}")
    private int maxShardsPerNode;


    @Autowired
    private SolrCloudClientFactory solrCloudClientFactory;

    public List<SolrDocument> getDocuments(String query, List<String> topics){
                List<String> collectionList = matchCollectionList(topics);
                List<SolrDocument> resultsList = Collections.synchronizedList(new ArrayList<>());
                Set<String> resultSet = Collections.synchronizedSet(new HashSet<String>());

                List<Thread> threads = new ArrayList<>();

            for (String collectionName : collectionList) {
                solrRecordFetchingClass thread = new solrRecordFetchingClass(query, collectionName, resultsList, solrCloudClientFactory, resultSet);
                System.out.println("Thread Created");
                threads.add(thread);
                System.out.println("Thread Added");
                thread.start();
            }
            // Wait for all threads to finish
            for (Thread thread : threads) {
                try {
                    thread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return resultsList;
//        System.out.println("resultsList = " + resultsList);
    }

    private String getCollectionName(String name){
        return name
                .toLowerCase()
                .replaceAll(" ", "_")
                .replaceAll("[^a-zA-Z0-9\\\\s]", "");
    }
    private List<String> matchCollectionList(List<String> queryTopicList){

        List<String> matches = new ArrayList<>();
        List<String> collectionList = solrCloudClientFactory.getCollectionList();
        for(String str1 : queryTopicList) {
            System.out.println("str1 = " + str1);
            if(collectionList.contains( getCollectionName(str1))){
                System.out.println("Matched");
                matches.add(getCollectionName(str1));
            }
        }

//        System.out.println("matches = " + matches);
        return matches;
    }
}

class solrRecordFetchingClass extends Thread{

    private final SolrCloudClientFactory solrCloudClientFactory;
    private final String query;
    private final String collectionName;
    private final List<SolrDocument> resultsList;

    private Set<String> hashString;
    solrRecordFetchingClass(
            String query, String collectionName, List<SolrDocument> resultsList, SolrCloudClientFactory solrCloudClientFactory, Set<String> hasStrings
    ){
        this.query = query;
        this.collectionName = collectionName;
        this.resultsList = resultsList;
        this.solrCloudClientFactory = solrCloudClientFactory;
        this.hashString = hasStrings;
        System.out.println("query = " + query);
        System.out.println("collectionName = " + collectionName);
        System.out.println("resultsList = " + resultsList);
        System.out.println("solrCloudClientFactory = " + solrCloudClientFactory);
    }
    @Override
    public void run(){
        SolrClient solrClient = solrCloudClientFactory.solrClient(collectionName);
        SolrQuery solrQuery = new SolrQuery();
        solrQuery.setQuery(query);
        solrQuery.set("defType", "edismax");

        // Set query parameters
        solrQuery.set("qf", "title^5 abstract^2 authors^2"); // Query fields and their boosting factors  abstract^2 authors^2
        solrQuery.set("pf", "title^10"); // Phrase fields and their boosting factors  abstract^5
//        solrQuery.set("mm", "50%"); // Minimum match percentage
//        solrQuery.set("tie", "0.1"); // Tiebreaker between the query terms and the phrase
//        This boost parameter will calculate the final score of each document by adding the product of the relevance score and 0.8 with the product of the inverse of the publication year and 0.2.
//        solrQuery.set("boost", "sum(product(query($qf),0.8),product(recip(sub("+Calendar.getInstance().get(Calendar.YEAR)+",year),1,1,0),0.2))");

        QueryResponse response = null;
        try {
            response = solrClient.query(solrQuery);
        } catch (SolrServerException | IOException e) {
            throw new RuntimeException(e);
        }
        SolrDocumentList documentList = response.getResults();
        synchronized (resultsList){
            for(SolrDocument solrDocument: documentList){
                if(!hashString.contains((String) solrDocument.getFieldValue("id"))){
                    resultsList.add(solrDocument);
                    hashString.add((String) solrDocument.getFieldValue("id"));
                }
            }
        }
    }
}