package com.Solr.Entities.controller;
import com.Solr.Entities.ServiceLayer.CloudServiceLayer;
import com.Solr.Entities.ServiceLayer.ServiceLayer;
import com.Solr.Entities.model.Paper;
import org.apache.solr.client.solrj.SolrServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class paperController {

	@Autowired
	private ServiceLayer serviceLayer;

	@Autowired
	private CloudServiceLayer cloudServiceLayer;

//	Below Method is for saving Documents in Single Solr Server
//	They will automatically create new core based on the topics
	/*
	JSON Receivable:
	{
    "id": "123",
    "title": "Example Paper 1",
    "abstractText": "This is an example of paper abstract.",
    "Published_Date": "2022-02-01",
    "authorList": ["Author 1", "Author 2"],
    "topics": ["Topic_1", "Topic_2"]
	}
	 */
	@PostMapping("/saveDocument")
	public String saveDocument(@RequestBody Paper paper){
		if (serviceLayer.saveDocument(paper) == null) return "Bad Response";
		return "Good Response";
	}


//	Below Method is for saving Documents in Solr Cloud Server
//	They will automatically create new collection based on the topics
	/*
	JSON Receivable:
	{
    "id": "123",
    "title": "Example Paper 1",
    "abstractText": "This is an example of paper abstract.",
    "Published_Date": "2022-02-01",
    "authorList": ["Author 1", "Author 2"],
    "topics": ["Topic_1", "Topic_2"]
	}
	 */

	@PostMapping("/saveCloudDocument")
	public String saveCloudDocument(@RequestBody Paper paper){
		System.out.println("Paper Received Successfully");
		if (cloudServiceLayer.saveDocument(paper) == null) return "Bad Response";
		return "Good Response";
	}


//	This method is not working, it has n^2 worst case condition, so it should be ignored
	@PostMapping("/saveDocuments")
	public String saveDocuments(@RequestBody List<Paper> paper) throws SolrServerException, IOException {
		System.out.println("paper = " + paper);
		if (serviceLayer.saveDocument(paper) == null) return "Bad Response";
		return "Good Response";
	}
}
