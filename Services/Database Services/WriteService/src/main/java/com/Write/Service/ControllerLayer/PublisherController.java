package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
public class PublisherController {

    @Autowired
    private PublisherService   publisherService;

    @PostMapping("/createPublisher")
    public Publisher savePublisher(@RequestBody Map<String, Object> requestBody){
        System.out.println("requestBody.get(\"PUBLISHER_NAME\") = " + requestBody.get("PUBLISHER_NAME"));
        System.out.println("requestBody.get(\"PUBLISHER_EMAIL\") = " + requestBody.get("PUBLISHER_EMAIL"));
        System.out.println("requestBody.get(\"USER\") = " + requestBody.get("USER_ID"));

//        Pass user ID as long or string and let the service layer retrieve the user.
        return publisherService.savePublisher((String)requestBody.get("PUBLISHER_NAME"), (String)requestBody.get("PUBLISHER_EMAIL"), (User) requestBody.get("USER_ID"));
    }
    // Below is the way to send all parameters in the form of Map
//    public Publisher savePublisher(@RequestBody Map<String, Object> requestBody){
//        System.out.println("requestBody = " + requestBody);
//        System.out.println("requestBody.get(\"email\") = " + requestBody.get("email"));
//        System.out.println("requestBody.get(\"pubName\") = " + requestBody.get("pubName"));
//        System.out.println("requestBody.get(\"pubLink\") = " + requestBody.get("pubLink"));
//        return (new Publisher());
//    }
}
