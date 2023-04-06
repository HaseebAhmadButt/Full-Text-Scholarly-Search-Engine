package com.Solr.ReadService.controller;
import com.Solr.ReadService.Component.SolrCloudClientFactory;
import com.Solr.ReadService.ServiceLayer.CloudServiceLayer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class paperController {

	@Autowired
	private SolrCloudClientFactory solrCloudClientFactory;

	@Autowired
	private CloudServiceLayer cloudServiceLayer;
//	{
//    "q":"Testing Pape",
//    "topics":["Natural Language Processing", "artificial intelligence", "topic 2"]
//}
	@PostMapping("/retrieveDocument")
	public List<SolrDocument> getDocuments(@RequestBody Map<String, Object> stringObjectMap) throws SolrServerException, IOException {
		System.out.println("stringObjectMap = " + stringObjectMap);
		return cloudServiceLayer.getDocuments((String) stringObjectMap.get("q"), (List<String>) stringObjectMap.get("topics"));

	}
}
