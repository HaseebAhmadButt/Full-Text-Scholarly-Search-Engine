package com.solr.Entities.Temp.model;

import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.SolrDocument;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SolrDocument(solrCoreName = "papers")
public class Paper {

	@Id
	@Field("id")
	private String id;

	@Field("title")
	private String title;

	@Field("abstract")
	private String abstractText;

	// getters and setters

}
