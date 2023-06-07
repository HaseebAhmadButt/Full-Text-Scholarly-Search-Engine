package com.Service.Graph_Write.Controller;

import com.JPA.Entities.Neo.Author.AuthorEntity;
import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.JPA.Entities.Neo.Topic.TopicEntity;
import com.Service.Graph_Write.Repositories.PaperRepository;
import com.Service.Graph_Write.ServicesLayer.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ControllerLayer {


    @Autowired
    private ServiceLayer serviceLayer;

    /*
    Acceptable JSON:

    Remove any specific field/Parameter and that value will not be stored in database
    {
      "paperId": "P100",            //DOI of Paper
      "citedPapers": [              //Papers which this paper has cited. They will be created automatically
        {
          "paperId": "P200"
        },
        {
          "paperId": "P300"
        }
      ],
      "citingPapers": [            //List of Papers who has cited this DOI/Paper
        {
          "paperId": "P400"
        }
      ],
      "authors": [              //Authors of this Paper
        {
          "authorId": 1,
          "name": "John Doe"
        },
        {
          "authorId": 2,
          "name": "Jane Smith"
        }
      ],
      "topic": [                //List of topics covered by this Paper
        {
          "id": 1,
          "title": "Machine Learning"
        },
        {
          "id": 2,
          "title": "Data Mining"
        }
      ]
    }
     */

    /*
    Acceptable JSON:

    Remove any specific field/Parameter and that value will not be stored in database
    {
      "paperId": "A00-1002",            //DOI of Paper
      "citedPapers": [              //Papers which this paper has cited. They will be created automatically
        {
          "paperId": "P200"
        },
        {
          "paperId": "P300"
        }
      ],
      "citingPapers": [            //List of Papers who has cited this DOI/Paper
        {
          "paperId": "P400"
        }
      ],
      "authors": [              //Authors of this Paper
        {
          "authorId": 1,
          "name": "John Doe"
        },
        {
          "authorId": 2,
          "name": "Jane Smith"
        }
      ],
      "topic": [                //List of topics covered by this Paper
        {
          "id": 1,
          "title": "Machine Learning"
        },
        {
          "id": 2,
          "title": "Data Mining"
        }
      ]
    }
     */

//    Same method is being used to update and save the paper, if no paper exists it will automatically create new nodes
//    and create their relationship
    @PostMapping("/savePaper")
    public PaperEntity savePaper(@RequestBody PaperEntity paperEntity){
        System.out.println("paperEntity = " + paperEntity);
        return serviceLayer.savePaper(paperEntity);
    }
    @PostMapping("/deletePaper")
    public ResponseEntity<Void> deletePaper(@RequestBody Map<String, String> paperDOI){
        System.out.println("paperDOI = " + paperDOI);
        String status =  serviceLayer.deleteArticle(paperDOI.get("DOI"));
        if (status==null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        else return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/deletePapersList")
    public ResponseEntity<Void> deletePapersList(@RequestBody Map<String, List<String>> paperDOI){
        System.out.println("paperDOI = " + paperDOI);
        String status =  serviceLayer.deleteArticleByDOIs(paperDOI.get("DOI"));
        if (status==null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        else return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/deletePaperAuthorsList")
    public ResponseEntity<Void> deletePaperAuthorsList(@RequestBody Map<String, List<String>> paperDOI){
        System.out.println("paperDOI = " + paperDOI);
        String status =  serviceLayer.deleteAuthorRelationShipByIDs(paperDOI.get("DOI"));
        if (status==null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        else return ResponseEntity.status(HttpStatus.OK).build();
    }


//    Adding Topic along with papers of that topic
    /*
            {
        "id": 3456,
        "title":"This is some testing Topic",
        "papers":[
            {"paperId":"p20987"}, {"paperId":"p20789"}, {"paperId":"p2087909"}
            ]
        }
     */
    @PostMapping("/saveTopic")
    public TopicEntity saveTopic(@RequestBody TopicEntity topicEntity){
        return serviceLayer.saveTopicEntity(topicEntity);
    }

    /*
    {
    "authorId": 3456,
    "name":"Billal Arshad",
    "papers":[
    {"paperId":"p20987"}, {"paperId":"p20789"}, {"paperId":"p2087909"}
    ]
}
     */

    @PostMapping("/saveAuthor")
    public AuthorEntity saveAuthor(@RequestBody AuthorEntity authorEntity){
        return serviceLayer.saveAuthorEntity(authorEntity);
    }





//    This method is not being used.

    @PostMapping("/saveAll")
    public List<PaperEntity> saveAll(@RequestBody List<PaperEntity> paperEntity){
        System.out.println("paperEntity = " + paperEntity);
        return serviceLayer.savePaper(paperEntity);
    }
}
