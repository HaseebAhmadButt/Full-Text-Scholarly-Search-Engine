package com.Solr.Entities.model;

import org.apache.solr.client.solrj.beans.Field;
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
	private String Published_Date;
	Set<String> authorList;

	Set<String> Topics;
}
