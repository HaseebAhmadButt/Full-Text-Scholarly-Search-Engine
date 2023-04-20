package com.Read.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.ServiceLayer.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

//    http://yourdomain.com/getAllPublishers?pageNo=2&pageSize=20

    @GetMapping("/getAllPublishers")
    public ResponseEntity<Page<Publisher>> getAllPublishers(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Publisher> publishers = publisherService.getAllPublishers(pageNo, pageSize);
        return ResponseEntity.ok(publishers);
    }
    @PostMapping("/getPublisher")
    public ResponseEntity<HashMap<String, Object>> getPublisherbyID(@RequestBody Map<String, Long> integerMap) {
        HashMap<String, Object> publisher = publisherService.getPublisherByUserID(integerMap.get("userID"));
        if(publisher.get("Publisher") != null){
            return ResponseEntity.ok().body(publisher);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }




}
