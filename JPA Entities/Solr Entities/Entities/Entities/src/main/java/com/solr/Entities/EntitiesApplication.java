package com.solr.Entities;

//import com.solr.Entities.LearningPackage.SolrConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
//@Import(SolrConfig.class)
//@SpringBootApplication
//@EnableSolrRepositories(basePackages = "com.solr.Entities.Temp")
//public class EntitiesApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(EntitiesApplication.class, args);
//	}
//
//}

@SpringBootApplication
//@EnableSolrRepositories(basePackages = "com.solr.Entities.Temp.repository")
@Import({SolrConfiguration.class})
public class EntitiesApplication {
	public static void main(String[] args) {
		SpringApplication.run(EntitiesApplication.class, args);
	}
}