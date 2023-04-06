package com.Solr.Entities.ServiceLayer;


import com.Solr.Entities.Component.SolrClientFactory;
import com.Solr.Entities.model.Paper;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.request.CoreAdminRequest;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class ServiceLayer {
    @Autowired
    private SolrClientFactory solrClientFactory;

    public UpdateResponse saveDocument(Paper paper) {
        try {
            List<String> articleTopics = checkCoreList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(articleTopic)) {
                    createNewCore(articleTopic);
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
        SolrClient solrClient = solrClientFactory.getSolrClient(articleTopic);
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
        List<String> existingCores = solrClientFactory.getCores();
        System.out.println("existingCores = " + existingCores);
        for(String topic: topics){
            System.out.println("topicInCheckList = " + topic);
            if(existingCores.contains(topic));
            else stringList.add(topic);
        }
        return stringList;
    }
    public void createNewCore(String newCoreName) throws SolrServerException, IOException {
        CoreAdminRequest.Create createRequest = new CoreAdminRequest.Create();
        createRequest.setCoreName(newCoreName);
        createRequest.setInstanceDir("./" + newCoreName);
        createRequest.setConfigSet("_default");
        createRequest.process(solrClientFactory.getSolrClient());
        solrClientFactory.setCores(newCoreName);
    }

//    Overloading above method to receive a list of Papers and store all of those in separate cores ine by one
    public UpdateResponse saveDocument(List<Paper> papers) throws SolrServerException, IOException {
        for (Paper paper : papers) {
            List<String> articleTopics = checkCoreList(paper.getTopics());
            for (String articleTopic : paper.getTopics()) {
                if (articleTopics.contains(articleTopic)) {
                    createNewCore(articleTopic);
                }
                saveArticle(paper, articleTopic);
            }
        }
        return new UpdateResponse();
    }






    public List<SolrInputDocument> searchDocuments(String query, String topic) {
        try {
            String coreName = "core_" + "test"; // generate core name based on topic

            SolrClient solrClient = solrClientFactory.getSolrClient(coreName);
            SolrQuery solrQuery = new SolrQuery();
            solrQuery.set("q", query);
            QueryResponse queryResponse = solrClient.query(solrQuery);
            List<SolrInputDocument> documents = queryResponse.getBeans(SolrInputDocument.class);
            return documents;
        } catch (SolrServerException | IOException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}
