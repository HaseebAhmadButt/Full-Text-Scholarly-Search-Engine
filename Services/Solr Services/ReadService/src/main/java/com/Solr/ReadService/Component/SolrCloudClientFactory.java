package com.Solr.ReadService.Component;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class SolrCloudClientFactory {
    @Value("${solr.urls}")
    private String solrUrl;

    @Value("${solr.cloud}")
    private boolean solrCloud;

    @Value("${solr.host}")
    private String solrHost;
    private List<String> collectionList = new ArrayList<>();
    public SolrClient solrClient(){
        if (solrCloud) {
            return new CloudSolrClient.Builder(Collections.singletonList(solrUrl), Optional.empty()).build();
        } else {
            return new Http2SolrClient.Builder(solrHost).build();
        }
    }

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
