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
    @GetMapping("/getSavedArticleIDs")
    public List<String> getSavedArticleIDs(@RequestParam Long userID){
        return articlesService.getSavedArticleIDs(userID);
    }
    @PostMapping("/getArticles")
    public Map<String, Object> getArticles(@RequestBody Map<String, List<String>> DOIs){
        HashMap<String,  Object> hashMap = new HashMap<>();

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
    @GetMapping("/getArticleTopic")
    public List<String> getArticleTopics (@RequestParam String DOI){
         return articlesService.getArticleTopics(DOI);
    }
    @GetMapping("/getArticleTopicsWithID")
    public List<Object> getArticleTopicsWithID (@RequestParam String DOI){
         return articlesService.getArticleTopicsWithID(DOI);
    }
    @GetMapping("/getArticlePDFWithID")
    public HashMap<String, String> getArticlePDFWithID (@RequestParam String DOI){
         return articlesService.getArticlePDFWithID(DOI);
    }
    @GetMapping("/getArticleAuthors")
    public List<Object> getArticleAuthors(@RequestParam(name="DOI") String ID) {
        return articlesService.getArticleAuthors(ID);
    }

    @GetMapping("/getAllArticles")
    public ResponseEntity<Page<Articles>> getAllProgressArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllAddedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }
    @GetMapping("/getAllAddedAcceptedArticles")
    public ResponseEntity<Page<Articles>> getAllAddedAcceptedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllAddedAcceptedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }
    @GetMapping("/getAllUploadRejectedArticles")
    public ResponseEntity<Page<Object[]>> getAllUploadRejectedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Object[]> articlesPage = articlesService.getAllUploadedRejectedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }


    @GetMapping("/getAllArticlesWithParams")
    public ResponseEntity<Page<Articles>> getAllProgressArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize,
                                                                 @RequestParam(name = "query") String query) {
        Page<Articles> articlesPage = articlesService.getAllAddedArticlesWithParameters(pageNo, pageSize,query);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }
    @GetMapping("/getAllAddedAcceptedArticlesWithParams")
    public ResponseEntity<Page<Articles>> getAllAcceptedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize,
                                                                 @RequestParam(name = "query") String query) {
        Page<Articles> articlesPage = articlesService.getAllAddedAcceptedArticlesWithParams(pageNo, pageSize,query);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }
    @GetMapping("/getAllAddedRejectedArticlesWithParams")
    public ResponseEntity<Page<Object[]>> getAllRejectedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                            @RequestParam(defaultValue = "10") int pageSize,
                                                                 @RequestParam(name = "query") String query) {
        Page<Object[]> articlesPage = articlesService.getAllUploadedRejectedArticlesWithParams(pageNo, pageSize,query);

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

    @GetMapping("/getAllAcceptedArticlesBySpecificPublisher")
    public ResponseEntity<Page<List<Object>>> getAllAcceptedArticlesBySpecificPublisher(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="publisherID") Long ID
    ) {
        Page<List<Object>> articlesPage = articlesService.getAcceptedArticles(pageNo, pageSize, ID);
        if(articlesPage == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }

    @GetMapping("/getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter")
    public ResponseEntity<Page<List<Object>>> getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="publisherID") Long ID,
            @RequestParam(name="q") String query
    ) {
        Page<List<Object>> articlesPage = articlesService.getAcceptedArticles(pageNo, pageSize, ID, query);
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
    @PostMapping("/getAllCitingArticles")
    public ResponseEntity<Page<Articles>> getAllAcceptedArticles(@RequestBody Map<String, Object> stringObjectMap) {
        Page<Articles> articlesPage = articlesService.getCitingArticles(
                (Integer) stringObjectMap.get("pageNo"),
                (Integer) stringObjectMap.get("pageSize"),
                (List<String>) stringObjectMap.get("DOIs")
        );

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }
    @GetMapping("/getArticleTitle")
    public ResponseEntity<HashMap<String, String>> getArticleTitle(@RequestParam(name = "DOI") String DOI) {
        String articleTitle = articlesService.getArticleTitle(DOI);
        HashMap<String, String> paperTitle = new HashMap<>();
        paperTitle.put("Title", articleTitle);
        return new ResponseEntity<>(paperTitle, HttpStatus.OK);
    }

    @GetMapping("/getAllRejectedArticles")
    public ResponseEntity<Page<Articles>> getAllRejectedArticles(@RequestParam(defaultValue = "0") int pageNo,
                                                           @RequestParam(defaultValue = "10") int pageSize) {
        Page<Articles> articlesPage = articlesService.getAllRejectedArticles(pageNo, pageSize);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Count", Long.toString(articlesPage.getTotalElements()));
        return new ResponseEntity<>(articlesPage, headers, HttpStatus.OK);
    }

    @GetMapping("/getArticleByDOI")
    public ResponseEntity<Articles> getArticle(@RequestParam(name = "DOI") String DOI){
        return articlesService.getArticleByDOI(DOI);
    }





}
