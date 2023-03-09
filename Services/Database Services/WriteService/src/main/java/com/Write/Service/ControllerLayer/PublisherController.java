package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
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

    @PostMapping("/publisher")
    public Publisher savePublisher(@RequestBody Map<String, Object> requestBody){
        System.out.println("requestBody = " + requestBody);
        System.out.println("requestBody.get(\"email\") = " + requestBody.get("email"));
        System.out.println("requestBody.get(\"email\") = " + requestBody.get("pubName"));
        System.out.println("requestBody.get(\"email\") = " + requestBody.get("pubLink"));
        return (new Publisher());
    }
}
