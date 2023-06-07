package com.Write.Service.ControllerLayer;


import com.Write.Service.ServiceLayer.PaperAuthorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PaperAuthorController {

    @Autowired
    private PaperAuthorsService paperAuthorsService;


    @PostMapping("/saveAuthorPapers")
    public ResponseEntity<Object> savePaperAuthors(@RequestBody Map<String, Object> stringObjectMap){
        Long author = Long.valueOf((Integer) stringObjectMap.get("publisherID"));
        List<String> articleIDs = (List<String>) stringObjectMap.get("articleIDs");
        String status = paperAuthorsService.saveAuthors(author, articleIDs);
        if(status.equals("OK")) {
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/deleteAuthorPapers")
    public ResponseEntity<Object> deletePaperAuthors(@RequestBody Map<String, Object> stringObjectMap){
        Long author = Long.valueOf((Integer) stringObjectMap.get("publisherID"));
        List<String> articleIDs = (List<String>) stringObjectMap.get("articleIDs");
        String status = paperAuthorsService.deleteAuthor(author, articleIDs);
        if(status.equals("OK")) return ResponseEntity.ok().build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
