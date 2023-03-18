package com.solr.Entities;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;

//@Configuration
//@EnableSolrRepositories(basePackages = "com.solr.Entities.Temp.repository")
public class SolrConfiguration {

    @Value("${solr.host}")
    private static String solrHost;
    static {
        System.out.println("solrHost = " + solrHost);
    }

    @Bean
    public SolrClient solrClient() {
        return new HttpSolrClient.Builder("http://localhost:8983/solr").build();
    }

    @Bean
    public SolrTemplate solrTemplate(SolrClient solrClient) throws Exception {
        return new SolrTemplate(solrClient);
    }
}
