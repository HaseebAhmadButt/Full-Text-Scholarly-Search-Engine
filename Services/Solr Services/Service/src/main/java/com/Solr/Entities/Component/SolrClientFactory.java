package com.Solr.Entities.Component;


import jakarta.annotation.PostConstruct;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.apache.solr.client.solrj.request.CoreAdminRequest;
import org.apache.solr.client.solrj.response.CoreAdminResponse;
import org.apache.solr.common.params.CoreAdminParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Component
public class SolrClientFactory {

    private List<String> coresList = new ArrayList<>();
    @Value("${solr.host}")
    private String solrHost;
    public SolrClient getSolrClient(String coreName) {
        return new Http2SolrClient.Builder(solrHost + "/" + coreName).build();
    }

    public SolrClient getSolrClient() {
        return new Http2SolrClient.Builder(solrHost).build();
    }

    public List<String> getCores() {
        return coresList;
    }

    public boolean setCores(String new_core) {
        return coresList.add(new_core);
    }

    @PostConstruct // run every 5 minutes
    public void fetchCores() {
        System.out.println("Building Solr server instance");
        SolrClient solrClient=this.getSolrClient();

        System.out.println("Requesting core list");
        CoreAdminRequest request = new CoreAdminRequest();
        request.setAction(CoreAdminParams.CoreAdminAction.STATUS);
        CoreAdminResponse cores=null;

        try {
            cores = request.process(solrClient);
        } catch (SolrServerException | IOException e) {
            e.printStackTrace();
        }

        System.out.println(" Listing cores");
        for (int i = 0; i < Objects.requireNonNull(cores).getCoreStatus().size(); i++) {
            coresList.add(cores.getCoreStatus().getName(i));
        }

        System.out.println(coresList.get(0)+" is the first core");
        System.out.println("coreList = " + coresList);
    }


}