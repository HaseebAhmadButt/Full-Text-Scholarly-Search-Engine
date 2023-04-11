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

    @GetMapping("/getAllArticles")
    public ResponseEntity<Page<Articles>> getAllArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllAddedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }


    @GetMapping("/getAllAcceptedArticles")
    public ResponseEntity<Page<Articles>> getAllAcceptedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                           @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllAcceptedArticles(pageNo, pageSize);

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
