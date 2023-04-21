package com.Read.Service.ControllerLayer;

import com.JPA.Entities.Beans.Articles;
import com.Read.Service.ServiceLayer.ArticlesService;
import com.Read.Service.ServiceLayer.ArticlesTopicService;
import com.Read.Service.ServiceLayer.RefrencesServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {

//    Visit Article_Test.http for understanding

    @Autowired
    private ArticlesService articlesService;
    @Autowired
    private RefrencesServiceLayer refrencesServiceLayer;
    @Autowired
    private ArticlesTopicService articlesTopicService;


    @GetMapping("/getRecentArticles")
    public List<Object[]> getRecentArticles(){
        return articlesService.getTopRecentArticles();
    }

    @GetMapping("/getTopCitedArticles")
    public List<Map<String, Object>> getTopCitedArticles(){
        return refrencesServiceLayer.getTopCitedPapers();
    }

    @GetMapping("/getSavedArticles")
    public List<Map<String, Object>> getSavedArticles(@RequestParam Long userID){
//        System.out.println("userID = " + userID);
//                System.out.println();
        return articlesService.getSavedArticles(userID);

    }
    @PostMapping("/getArticles")
    public Map<String, Object> getArticles(@RequestBody Map<String, List<String>> DOIs){
        HashMap<String,  Object> hashMap = new HashMap<>();
        System.out.println("Received Data: "+DOIs);
        System.out.println((Arrays.toString(new List[]{DOIs.get("DOIs")})));

        List<Map<String, Object>> allArticles =  articlesService.getArticles(DOIs.get("DOIs"));
        hashMap.put("allArticles", allArticles);
        List<Map<String, List<String>>> articleTopics = articlesService.getArticlesTopics(DOIs.get("DOIs"));
        hashMap.put("articleTopics", articleTopics);
        return hashMap;
    }

    @GetMapping("/getTopics")
    public List<String> getTopics(){
        return articlesTopicService.top10Topics();
    }

    @PostMapping("/getArticleTopics")
    public List<Map<String, List<String>>> mapList (@RequestBody List<String> DOIs){
         return articlesService.getArticlesTopics(DOIs);
    }


    @GetMapping("/getAllArticles")
    public ResponseEntity<Page<Articles>> getAllProgressArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllAddedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }


    @GetMapping("/getAllAcceptedArticles")
    public ResponseEntity<Page<Articles>> getAllAcceptedArticles(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="userID") Long ID
    ) {
        Page<Articles> articlesPage = articlesService.getAllAcceptedArticles(pageNo, pageSize, ID);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }

    @GetMapping("/getAllUploadedArticlesBySpecificPublisher")
    public ResponseEntity<Page<List<Object>>> getAllUploadedArticlesBySpecificPublisher(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="publisherID") Long ID
    ) {
        Page<List<Object>> articlesPage = articlesService.getUploadedArticles(pageNo, pageSize, ID);
        if(articlesPage == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }







    @GetMapping("/getAllRequiredAcceptedArticles")
    public ResponseEntity<Page<Articles>> getAllAcceptedArticles(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="userID") Long ID,
            @RequestParam(name="query") String query
    ) {
        Page<Articles> articlesPage = articlesService.getAllRequiredAcceptedArticles(pageNo, pageSize, ID, query);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }

    @GetMapping("/getAllRejectedArticles")
    public ResponseEntity<Page<Articles>> getAllRejectedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                           @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllRejectedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }

}
