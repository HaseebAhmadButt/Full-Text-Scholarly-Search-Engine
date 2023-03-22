package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class PublisherController {

    @Autowired
    private PublisherService   publisherService;


    @PostMapping("/createPublisher")
    public HashMap<String, String> createPublisher(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.savePublisher((String)stringObjectMap.get("PublisherName")));
        return hashMap;
    }
    @PutMapping("/updatePublisherEmail")
    public HashMap<String, String> updatePublisherEmail(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherEmail(
                Long.valueOf((Integer)stringObjectMap.get("ID")),
                (String)stringObjectMap.get("PublisherEmail")));
        return hashMap;
    }


    @PutMapping("/updatePublisherHIndex")
    public HashMap<String, String> updatePublisherHIndex(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherHIndex(
                Long.valueOf((Integer)stringObjectMap.get("ID")),
                (double) stringObjectMap.get("hIndex")));
        return hashMap;
    }

    @PutMapping("/updatePublisherHMedian")
    public HashMap<String, String> updatePublisherHMedian(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherHMedian(
                Long.valueOf((Integer)stringObjectMap.get("ID")),
                (double) stringObjectMap.get("hMedian")));
        return hashMap;
    }

    @PutMapping("/updatePublisherSite")
    public HashMap<String, String> updatePublisherSite(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherWebsite(
                Long.valueOf((Integer)stringObjectMap.get("ID")),
                (String) stringObjectMap.get("link")));
        return hashMap;
    }


    @PutMapping("/updatePublisherAffiliations")
    public HashMap<String, String> updatePublisherAffiliaitons(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.updatePublisherCompleteAffiliation(
                Long.valueOf((Integer)stringObjectMap.get("ID")),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink")));
        return hashMap;
    }

    @PostMapping("/updatePublisherAffiliations")
    public HashMap<String, String> createCompleteProfile(@RequestBody Map<String, Object> stringObjectMap){
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("Status", publisherService.createFilledProfile(
                (String) stringObjectMap.get("email"),
                (String) stringObjectMap.get("name"),
                (String) stringObjectMap.get("link"),
                (String) stringObjectMap.get("affiliationName"),
                (String) stringObjectMap.get("affiliationLink"),
                (String[]) stringObjectMap.get("authorNames"),
                (String[]) stringObjectMap.get("areasOfInterest"),
                Long.valueOf((Integer) stringObjectMap.get("userID"))
        ));
        return hashMap;
    }

}
