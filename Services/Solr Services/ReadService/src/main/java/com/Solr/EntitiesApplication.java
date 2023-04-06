package com.Solr;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class EntitiesApplication {
	public static void main(String[] args) {
		SpringApplication.run(EntitiesApplication.class, args);
	}
	@Value("${solr.host}")
	private String solrHost;

	@Bean
	public SolrClient solrClient() {
		return new Http2SolrClient.Builder(solrHost).build();
	}
}
//}
