package com.Write.Service.ControllerLayer;


import com.Write.Service.ServiceLayer.PublisherService;
import com.Write.Service.ServiceLayer.SavedArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private SavedArticlesService savedArticlesService;


    //    If user has entered only its name on Publisher Page then, call this URL. So, creating publisher account now
    @PostMapping("/createSimplePublisher")
    public HashMap<String, String> createPublisher(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.
                savePublisher((String) stringObjectMap.get("PublisherName"),Long.valueOf((Integer) stringObjectMap.get("ID"))));
        return hashMap;
    }

    //    To Update Publisher Email
    @PutMapping("/updatePublisherEmail")
    public HashMap<String, String> updatePublisherEmail(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
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





    @PostMapping("/updatePublisherProfile")
    public HashMap<String, String> createCompleteProfile(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.createFilledProfile(
                (String) stringObjectMap.get("email"),
                (String) stringObjectMap.get("name"),
                (String) stringObjectMap.get("personalLink"),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink"),
                (String[]) stringObjectMap.get("authorNames"),
                (String[]) stringObjectMap.get("areasOfInterest"),
                Long.valueOf((Integer) stringObjectMap.get("userID"))
        ));
        return hashMap;
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
    public HashMap<String, String> createProfilePartial(@RequestBody Map<String, Object> stringObjectMap) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.createFilledProfileWithOutArrays(
                (String) stringObjectMap.get("email"),
                (String) stringObjectMap.get("name"),
                (String) stringObjectMap.get("personalLink"),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink"),
                Long.valueOf((Integer) stringObjectMap.get("userID"))
        ));
        return hashMap;
    }



    @PostMapping("/saveArticle/{DOI}/{userID}")
    public String saveArticle(@RequestParam String DOI, @RequestParam Long userID) {
        savedArticlesService.saveArticle(DOI,userID);
        return "OK";
    }

    @PostMapping("/removeArticle")
    public String removeArticle(@RequestParam String DOI, @RequestParam Long userID) {
        savedArticlesService.removeSavedArticle(DOI,userID);
        return "OK";
    }


}
