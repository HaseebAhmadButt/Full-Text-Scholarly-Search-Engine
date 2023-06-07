//package com.Solr.WriteService.ServiceLayer;
//
//
////import com.Solr.WriteService.Component.SolrClientFactory;
//import com.Solr.WriteService.Component.SolrClientFactory;
//import com.Solr.WriteService.model.Paper;
//import org.apache.solr.client.solrj.SolrClient;
//import org.apache.solr.client.solrj.SolrQuery;
//import org.apache.solr.client.solrj.SolrServerException;
//import org.apache.solr.client.solrj.request.CoreAdminRequest;
//import org.apache.solr.client.solrj.request.schema.SchemaRequest;
//import org.apache.solr.client.solrj.response.QueryResponse;
//import org.apache.solr.client.solrj.response.UpdateResponse;
//import org.apache.solr.common.SolrInputDocument;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.*;
//
//@Service
//public class ServiceLayer {
//    @Autowired
//    private SolrClientFactory solrClientFactory;
//
//    public UpdateResponse saveDocument(Paper paper) {
//        try {
//            List<String> articleTopics = checkCoreList(paper.getTopicsList());
//            for (String articleTopic : paper.getTopicsList()) {
//                if (articleTopics.contains(articleTopic)) {
//                    createNewCore(articleTopic);
//                }
//                saveArticle(paper, articleTopic);
//            }
//            System.out.println("Document saved successfully in new_core ");
//            return new UpdateResponse();
//        } catch (SolrServerException | IOException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//    private void saveArticle(Paper paper, String articleTopic) throws SolrServerException, IOException {
//        SolrClient solrClient = solrClientFactory.getSolrClient(articleTopic);
//        CloudServiceLayer.createSolrDocument(paper, solrClient);
//    }
//
//    private List<String> checkCoreList(Set<String> topics){
//        List<String> stringList = new ArrayList<>();
//        List<String> existingCores = solrClientFactory.getCores();
//        for(String topic: topics){
//            if(existingCores.contains(topic));
//            else stringList.add(topic);
//        }
//        return stringList;
//    }
//    public void createNewCore(String newCoreName) throws SolrServerException, IOException {
////        CoreAdminRequest.Create createRequest = new CoreAdminRequest.Create();
////        createRequest.setCoreName(newCoreName);
////        createRequest.setInstanceDir("./" + newCoreName);
////        createRequest.setConfigSet("_default");
////        createRequest.process(solrClientFactory.getSolrClient());
////        solrClientFactory.setCores(newCoreName);
//
//        CoreAdminRequest.Create createRequest = new CoreAdminRequest.Create();
//        createRequest.setCoreName(newCoreName);
//        createRequest.setInstanceDir("./" + newCoreName);
//
//// Add fields to schema
//        List<Map<String, Object>> fieldMaps = new ArrayList<>();
//        fieldMaps.add(getFieldMap("id", "string", true, true, false));
//        fieldMaps.add(getFieldMap("title", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("abstractText", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("publishedDate", "plong", true, true));
//        fieldMaps.add(getFieldMap("journalName", "text_general", true, true, false));
//        fieldMaps.add(getFieldMap("authorList", "text_general", true, true, true));
//        fieldMaps.add(getFieldMap("topicsList", "text_general", true, true, true));
//
//        SolrClient solrClient = solrClientFactory.getSolrClient();
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
//
//        createRequest.process(solrClient);
//        solrClientFactory.setCores(newCoreName);
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
//
////    Overloading above method to receive a list of Papers and store all of those in separate cores ine by one
//    public UpdateResponse saveDocument(List<Paper> papers) throws SolrServerException, IOException {
//        for (Paper paper : papers) {
//            List<String> articleTopics = checkCoreList(paper.getTopicsList());
//            for (String articleTopic : paper.getTopicsList()) {
//                if (articleTopics.contains(articleTopic)) {
//                    createNewCore(articleTopic);
//                }
//                saveArticle(paper, articleTopic);
//            }
//        }
//        return new UpdateResponse();
//    }
//    public List<SolrInputDocument> searchDocuments(String query, String topic) {
//        try {
//            String coreName = "core_" + "test"; // generate core name based on topic
//
//            SolrClient solrClient = solrClientFactory.getSolrClient(coreName);
//            SolrQuery solrQuery = new SolrQuery();
//            solrQuery.set("q", query);
//            QueryResponse queryResponse = solrClient.query(solrQuery);
//            List<SolrInputDocument> documents = queryResponse.getBeans(SolrInputDocument.class);
//            return documents;
//        } catch (SolrServerException | IOException e) {
//            e.printStackTrace();
//        }
//        return Collections.emptyList();
//    }
//}
