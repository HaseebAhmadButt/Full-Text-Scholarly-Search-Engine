package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
import com.Write.Service.RepositoryLayer.PaperAuthorsRepository;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import com.Write.Service.ServiceLayer.PublisherService;
import com.Write.Service.ServiceLayer.SavedArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@CrossOrigin("http://localhost:3000")
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private SavedArticlesService savedArticlesService;

    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private PaperAuthorsRepository paperAuthorsRepository;



    //    If user has entered only its name and email on Publisher Page then, call this URL. So, creating publisher account now
    @PostMapping("/createSimplePublisher")
    public ResponseEntity<Object> createPublisher(@RequestBody Map<String, Object> stringObjectMap) {

        String status = publisherService
                .savePublisher(
                        (String) stringObjectMap.get("PublisherName"),
                        (String) stringObjectMap.get("PublisherEmail"),
                        Long.valueOf((Integer) stringObjectMap.get("ID")));
        if(Objects.equals(status, "OK"))
        {
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    //    To Update Publisher Email
    @PutMapping("/updatePublisherEmail")
    public HashMap<String, String> updatePublisherEmail(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        System.out.println("stringObjectMap = " + stringObjectMap);
        hashMap.put("Status", publisherService.updatePublisherEmail(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (String) stringObjectMap.get("PublisherEmail")));
        return hashMap;
    }
    @PutMapping("/updatePublisherHIndex")
    public HashMap<String, String> updatePublisherHIndex(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherHIndex(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (double) stringObjectMap.get("hIndex")));
        return hashMap;
    }
    @PutMapping("/updatePublisherHMedian")
    public HashMap<String, String> updatePublisherHMedian(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherHMedian(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (double) stringObjectMap.get("hMedian")));
        return hashMap;
    }
    @PutMapping("/updatePublisherSite")
    public HashMap<String, String> updatePublisherSite(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherWebsite(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (String) stringObjectMap.get("link")));
        return hashMap;
    }
    @PutMapping("/updatePublisherAffiliationName")
    public HashMap<String, String> updatePublisherAffiliationName(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherAffiliationName(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (String) stringObjectMap.get("affiliationName")));
        return hashMap;
    }

    @PutMapping("/updatePublisherAffiliationLink")
    public HashMap<String, String> updatePublisherAffiliationLink(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherAffiliationLink(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (String) stringObjectMap.get("affiliationLink")));
        return hashMap;
    }
//    ---------------------------------------------If possible use this
    @PutMapping("/updatePublisherAffiliations")
    public HashMap<String, String> updatePublisherAffiliations(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherCompleteAffiliation(
                Long.valueOf((Integer) stringObjectMap.get("ID")),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink")));
        return hashMap;
    }
//    --------------------------------------------------------------


//    Below request will accept this kind of JSON
    /*
        {
          "email": "john.doe@example.com",
          "name": "John Doe",
          "personalLink": "https://johndoe.com",
          "affiliationName": "Example University",
          "affiliationLink": "https://example.edu",
          "authorNames": ["Jane Doe", "Bob Smith"],
          "areasOfInterest": ["Machine Learning", "Natural Language Processing"],
          "userID": 12345
        }
     */

    @PostMapping("/createPublisherProfile")
    public ResponseEntity<Object> createCompleteProfile(@RequestBody Map<String, Object> stringObjectMap) {
        String status =  publisherService.createFilledProfile(
                (String) stringObjectMap.get("email"),
                (String) stringObjectMap.get("name"),
                (String) stringObjectMap.get("personalLink"),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink"),
                (List<String>) stringObjectMap.get("authorNames"),
                (List<String>) stringObjectMap.get("areasOfInterest"),
                Long.valueOf((Integer) stringObjectMap.get("userID")));
        if(status.equals("OK")) {
            Publisher publisher = publisherRepository.getPublisherByEmail((String) stringObjectMap.get("email"));
            return ResponseEntity.ok().body(publisher);
        }
        else if (status.equals("Conflict")) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    /*
            {
          "email": "john.doe@example.com",
          "name": "John Doe",
          "personalLink": "https://johndoe.com",
          "affiliationName": "Example University",
          "affiliationLink": "https://example.edu",
          "userID": 12345
        }

     */

    @PostMapping("/updatePublisherPartial")
    public ResponseEntity<Object> createProfilePartial(@RequestBody Map<String, Object> stringObjectMap) {
        Publisher publisher = publisherService.createFilledProfileWithOutArrays(
                (String) stringObjectMap.get("email"),
                (String) stringObjectMap.get("name"),
                (String) stringObjectMap.get("personalLink"),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink"),
                Long.valueOf((Integer) stringObjectMap.get("userID")));
        if(publisher.getPublisherID() != null){
            return ResponseEntity.ok().body(publisher);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

//        HashMap<String, String> hashMap = new HashMap<>();
//        hashMap.put("Status",
//
//        );
//        return hashMap;
    }



    @PostMapping("/saveArticle")
    public String saveArticle(
            @RequestBody Map<String, Object> stringObjectMap
    ) {
        savedArticlesService.saveArticle(
                (Set<String>) stringObjectMap.get("DOI"),
                Long.valueOf((Integer) stringObjectMap.get("userID")));
        return "OK";
    }

    @PostMapping("/removeArticle")
    public ResponseEntity<Object> removeArticle(@RequestBody Map<String, Object> stringObjectMap) {
     String status = savedArticlesService.removeSavedArticle((List<String>) stringObjectMap.get("DOIs"), Long.valueOf((Integer) stringObjectMap.get("userID")));
     if(status.equals("OK")) {return ResponseEntity.ok().build();}
     else { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();}
    }


}
