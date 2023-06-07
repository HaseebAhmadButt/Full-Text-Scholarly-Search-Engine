package com.Solr.ReadService.controller;
//import com.Solr.ReadService.Component.SolrCloudClientFactory;
import com.Solr.ReadService.ServiceLayer.CloudServiceLayer;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class paperController {

//	@Autowired
//	private SolrCloudClientFactory solrCloudClientFactory;

	@Autowired
	private CloudServiceLayer cloudServiceLayer;
//	{
//    "q":"Testing Pape",
//    "topics":["Natural Language Processing", "artificial intelligence", "topic 2"]
//}
	@GetMapping("/retrieveDocument")
	public ResponseEntity<List<HashMap<String, Object>>> getDocuments(@RequestParam String query) throws JsonProcessingException {
		List<HashMap<String, Object>> solrDocuments = cloudServiceLayer.getSolrDocuments(query,100);
//		System.out.println("query = " + solrDocuments);
		return ResponseEntity.ok(solrDocuments);

	}
	@PostMapping("/retrieveRelatedArticles")
	public ResponseEntity<List<HashMap<String, Object>>> getRelatedDocuments(@RequestBody HashMap<String, String> query) throws JsonProcessingException {
		List<HashMap<String, Object>> solrDocuments = cloudServiceLayer.getRelatedArticles(query.get("paragraph"));
//		System.out.println("query = " + solrDocuments);
		return ResponseEntity.ok(solrDocuments);

	}
//	@GetMapping("/collectionList")
//	public List<String> getCollectionList(@RequestParam String query){
////		return cloudServiceLayer.collectionList();
//
//	}
}
