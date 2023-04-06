package com.Solr.Entities.ServiceLayer;


import com.Solr.Entities.Component.SolrCloudClientFactory;
import com.Solr.Entities.model.Paper;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.request.CoreAdminRequest;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.common.params.CollectionAdminParams;
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
            List<String> articleTopics = checkCoreList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(articleTopic)) {
                    createNewCollection(articleTopic);
                }
                saveArticle(paper, articleTopic);
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
        SolrInputDocument document = new SolrInputDocument();
        document.addField("id", paper.getId());
        document.addField("title", paper.getTitle());
        document.addField("abstract", paper.getAbstractText());
        document.addField("year", paper.getPublished_Date());
        document.addField("authors", paper.getAuthorList());
        solrClient.add(document);
        solrClient.commit();
    }

    private List<String> checkCoreList(Set<String> topics){
        List<String> stringList = new ArrayList<>();
        List<String> existingCores = solrCloudClientFactory.getCollectionList();
        System.out.println("existingCores = " + existingCores);
        for(String topic: topics){
            System.out.println("topicInCheckList = " + topic);
            if(existingCores.contains(topic));
            else stringList.add(topic);
        }
        return stringList;
    }
    public void createNewCollection(String newCollectionName) throws SolrServerException, IOException {
        CollectionAdminRequest.Create createRequest =
                CollectionAdminRequest.createCollection(newCollectionName, collectionConfigurations, totalShards, totalReplicas);
        createRequest.process(solrCloudClientFactory.solrClient());
        solrCloudClientFactory.setCollections(newCollectionName);
    }

    //    Overloading above method to receive a list of Papers and store all of those in separate cores ine by one
    public UpdateResponse saveDocument(List<Paper> papers) throws SolrServerException, IOException {
        for (Paper paper : papers) {
            List<String> articleTopics = checkCoreList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(articleTopic)) {
                    createNewCollection(articleTopic);
                }
                saveArticle(paper, articleTopic);
            }
        }
        return new UpdateResponse();
    }
}
