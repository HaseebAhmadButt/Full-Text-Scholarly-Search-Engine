package com.Write.Service.ControllerLayer;

import com.Write.Service.ServiceLayer.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class EmailController {

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/sendEmailFromContact")
    public ResponseEntity<Object> sendContactEmail(@RequestBody HashMap<String, String> email){
        String status = emailSenderService.sendEmail(
                email.get("mailFrom"),
                email.get("mailSubject"),
                email.get("mailBody"),
                email.get("mailNumber"),
                email.get("senderName")
        );
        if(status.equals("OK")) return ResponseEntity.status(HttpStatus.OK).build();
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    @PostMapping("/sendSuggestionEmailFromContact")
    public ResponseEntity<Object> sendSuggestionEmail(@RequestBody HashMap<String, String> email){
        String status = emailSenderService.sendEmail(
                email.get("mailSubject"),
                email.get("mailBody")
        );
        if(status.equals("OK")) return ResponseEntity.status(HttpStatus.OK).build();
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
