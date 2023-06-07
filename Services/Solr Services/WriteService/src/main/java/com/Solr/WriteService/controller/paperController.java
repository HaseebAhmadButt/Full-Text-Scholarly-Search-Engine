package com.Solr.WriteService.controller;
import com.Solr.WriteService.ServiceLayer.CloudServiceLayer;
//import com.Solr.WriteService.ServiceLayer.ServiceLayer;
//import com.Solr.WriteService.ServiceLayer.ServiceLayer;
import com.Solr.WriteService.model.Paper;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class paperController {

//	@Autowired
//	private ServiceLayer serviceLayer;

	@Autowired
	private CloudServiceLayer cloudServiceLayer;

//	Below Method is for saving Documents in Single Solr Server
//	They will automatically create new core based on the topics
	/*
	JSON Receivable:
	{
    "id": "12345/10.98.23",
    "title": "Testing Paper 3",
    "abstractText": "This is an example of paper abstract.",
    "published_Date": "2022",
    "authorList": ["Author 1", "Author 2"],
    "topics": ["Natural Language Processing", "Artificial Intelligence"]
	}
	 */
//	@PostMapping("/saveDocument")
//	public String saveDocument(@RequestBody Paper paper){
//		if (serviceLayer.saveDocument(paper) == null) return "Bad Response";
//		return "Good Response";
//	}


//	Below Method is for saving Documents in Solr Cloud Server
//	They will automatically create new collection based on the topics
	/*
	JSON Receivable:
	{
    "id": "12345/10.98.23",
    "title": "Testing Paper 3",
    "abstractText": "This is an example of paper abstract.",
    "published_Date": "2022",
    "journalName":"Journal Name"
    "authorList": ["Author 1", "Author 2"],
    "topicsList": ["Natural Language Processing", "Artificial Intelligence"]
	}
	 */

	@PostMapping("/saveCloudDocument")
	public ResponseEntity<Object> saveCloudDocument(@RequestBody Paper paper){
		System.out.println("paper = " + paper);
		System.out.println("Paper Received Successfully");
//		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
		return cloudServiceLayer.saveDocument(paper);
//		return null;
	}
	@PostMapping("/deleteCloudDocument")
	public ResponseEntity<Object> deleteCloudDocument(@RequestBody Map<String, Object> stringObjectMap){
		System.out.println("paper = " + stringObjectMap);
		System.out.println("Paper Received Successfully");
		return cloudServiceLayer
				.deleteDocument(
						(String) stringObjectMap.get("documentID"),
						(List<String>) stringObjectMap.get("topics")
				);
	}


//	This method is not working, it has n^2 worst case condition, so it should be ignored
//	@PostMapping("/saveDocuments")
//	public String saveDocuments(@RequestBody List<Paper> paper) throws SolrServerException, IOException {
//		System.out.println("paper = " + paper);
//		if (serviceLayer.saveDocument(paper) == null) return "Bad Response";
//		return "Good Response";
//	}
}
