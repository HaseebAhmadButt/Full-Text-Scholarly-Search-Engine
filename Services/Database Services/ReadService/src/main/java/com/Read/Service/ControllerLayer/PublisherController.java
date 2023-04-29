package com.Read.Service.ControllerLayer;


import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.ServiceLayer.PublisherService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

//    http://yourdomain.com/getAllPublishers?pageNo=2&pageSize=20

    @GetMapping("/getAllPublishers")
    public ResponseEntity<Page<Publisher>> getAllPublishers(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "1") int pageSize) {
        Page<Publisher> publishers = publisherService.getAllPublishers(pageNo, pageSize);
        return ResponseEntity.ok(publishers);
    }
    @GetMapping("/getPublisherWithEmail")
    public ResponseEntity<Page<Publisher>> getPublisherWithEmail(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "1") int pageSize,
                                                                 @RequestParam(name = "email") String email) {
        Page<Publisher> publishers = publisherService.getPublishersWitEmail(pageNo, pageSize, email);
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



//    @CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)

    @CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
    @RequestMapping(method = RequestMethod.OPTIONS, value = "/downloadPDF")
    public ResponseEntity<?> handlePreflight() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return ResponseEntity.ok().headers(headers).build();
    }

    @CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
    @GetMapping(value = "/downloadPDF", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadPDF(@RequestParam("pdfAddress") String pdfAddress) throws IOException {
        File file = new File(pdfAddress);
        InputStream inputStream = new FileInputStream(file);
        byte[] bytes = IOUtils.toByteArray(inputStream);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(file.getName()).build());
        headers.setContentLength(bytes.length);
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");

        return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);
    }






}
