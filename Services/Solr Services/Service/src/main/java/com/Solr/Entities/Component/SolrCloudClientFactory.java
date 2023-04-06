package com.Solr.Entities.Component;

import jakarta.annotation.PostConstruct;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.request.CoreAdminRequest;
import org.apache.solr.client.solrj.response.CollectionAdminResponse;
import org.apache.solr.client.solrj.response.CoreAdminResponse;
import org.apache.solr.common.params.CoreAdminParams;
import org.apache.solr.common.util.NamedList;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

@Component
public class SolrCloudClientFactory {
    @Value("${solr.urls}")
    private String solrUrl;

    @Value("${solr.cloud}")
    private boolean solrCloud;

    @Value("${solr.host}")
    private String solrHost;
    private List<String> collectionList = new ArrayList<>();
//    @Bean
    public SolrClient solrClient(){
        if (solrCloud) {
            return new CloudSolrClient.Builder(Collections.singletonList(solrUrl), Optional.empty()).build();
        } else {
            return new Http2SolrClient.Builder(solrHost).build();
        }
    }

//    @Bean
    public SolrClient solrClient(String collection) {
        if (solrCloud) {
            CloudSolrClient solrClient = new CloudSolrClient.Builder(Collections.singletonList(solrUrl), Optional.empty()).withCollectionCacheTtl(10000)
                    .build();
            solrClient.setDefaultCollection(collection);
            return solrClient;
        } else {
            return new Http2SolrClient.Builder(solrUrl + "/" + collection).build();
        }
    }


    public List<String> getCollectionList() {
        return collectionList;
    }

    public boolean setCollections(String new_collection) {
        return collectionList.add(new_collection);
    }
    @PostConstruct
    public void fetchCores() {
        try {
            collectionList = CollectionAdminRequest.listCollections(solrClient());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
