package com.Solr.WriteService.model;

//import org.springframework.data.annotation.Id;
//import org.springframework.data.solr.core.mapping.SolrDocument;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Paper {
	private String id;
	private String title;
	private String abstractText;
	private Long Published_Date;
	private String journalName;
	Set<String> authorList;
	Set<String> topicsList;
}
