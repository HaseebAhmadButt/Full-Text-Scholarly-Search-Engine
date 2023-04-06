package com.Solr.WriteService.ServiceLayer;


import com.Solr.WriteService.Component.SolrCloudClientFactory;
import com.Solr.WriteService.model.Paper;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
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

    public UpdateResponse saveDocument(Paper paper) {
        try {
            List<String> articleTopics = checkCollectionList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(getCollectionName(articleTopic))) {
                    createNewCollection(articleTopic);
                }
                saveArticle(paper, getCollectionName(articleTopic));
            }
            System.out.println("Document saved successfully in new_core ");
            return new UpdateResponse();
        } catch (SolrServerException | IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    private void saveArticle(Paper paper, String articleTopic) throws SolrServerException, IOException {
        SolrClient solrClient = solrCloudClientFactory.solrClient(articleTopic);
        createSolrDocument(paper, solrClient);
    }

    static void createSolrDocument(Paper paper, SolrClient solrClient) throws SolrServerException, IOException {
        System.out.println("paper.getPublished_Date() = " + paper.getPublished_Date());
        SolrInputDocument document = new SolrInputDocument();
        document.addField("id", paper.getId());
        document.addField("title", paper.getTitle());
        document.addField("abstract", paper.getAbstractText());
        document.addField("year", paper.getPublished_Date());
        document.addField("authors", paper.getAuthorList());
        solrClient.add(document);
        solrClient.commit();
    }

    private List<String> checkCollectionList(Set<String> topics){
        List<String> stringList = new ArrayList<>();
        List<String> existingCores = solrCloudClientFactory.getCollectionList();
        for(String topic: topics){
            String t = getCollectionName(topic);
            if(existingCores.contains(t));
            else stringList.add(t);
        }
        return stringList;
    }
    public void createNewCollection(String newCollectionName) throws SolrServerException, IOException {
        System.out.println("newCollectionName = " + newCollectionName);
        CollectionAdminRequest.Create createRequest =
                CollectionAdminRequest.createCollection(
                        getCollectionName(newCollectionName),
                        collectionConfigurations,
                        totalShards,
                        totalReplicas);
        System.out.println("Collection Created");
        createRequest.process(solrCloudClientFactory.solrClient());
        solrCloudClientFactory.setCollections(newCollectionName);
    }

    //    Overloading above method to receive a list of Papers and store all of those in separate cores ine by one
    public UpdateResponse saveDocument(List<Paper> papers) throws SolrServerException, IOException {
        for (Paper paper : papers) {
            List<String> articleTopics = checkCollectionList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(articleTopic)) {
                    createNewCollection(articleTopic);
                }
                saveArticle(paper, articleTopic);
            }
        }
        return new UpdateResponse();
    }

    private String getCollectionName(String name){
        return name
                .toLowerCase()
                .replaceAll(" ", "_")
                .replaceAll("[^a-zA-Z0-9\\\\s]", "");
    }
}
