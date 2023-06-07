package com.Read.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.RepositoryLayer.ArticlesRepository;
import com.Read.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    public Page<Articles> getAllAddedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedArticles(pageable);
    }
    public Page<Object[]> getAllUploadedRejectedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedRejectedArticles(pageable);
    }
    public Page<Articles> getAllAddedAcceptedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedAcceptedArticles(pageable);
    }
    public Page<Articles> getAllAddedArticlesWithParameters(int pageNo, int pageSize, String query) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedArticlesWithParameters(query,pageable);
    }
    public Page<Object[]> getAllUploadedRejectedArticlesWithParams(int pageNo, int pageSize, String query) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedRejectedArticlesWithParameters(query,pageable);
    }
    public Page<Articles> getAllAddedAcceptedArticlesWithParams(int pageNo, int pageSize, String query) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedAcceptedArticlesWithParameters(query, pageable);
    }

    public Page<List<Object>> getUploadedArticles(int pageNo, int PageSize, Long publisherID){
        Pageable pageable = PageRequest.of(pageNo, PageSize);
        try{
            return articlesRepository.getAllUploadedArticlesBySpecificPublisher(publisherID, pageable);
        }
        catch (Exception exception){
            return null;
        }
    }
    public Page<List<Object>> getAcceptedArticles(int pageNo, int PageSize, Long publisherID){
        Pageable pageable = PageRequest.of(pageNo, PageSize);
        try{
            return articlesRepository.getAllAcceptedArticlesBySpecificPublisher(publisherID, pageable);
        }
        catch (Exception exception){
            return null;
        }
    }
    public Page<List<Object>> getAcceptedArticles(int pageNo, int PageSize, Long publisherID, String query){
        Pageable pageable = PageRequest.of(pageNo, PageSize);
        try{
            return articlesRepository.getAllAcceptedArticlesBySpecificPublisher(publisherID, query, pageable);
        }
        catch (Exception exception){
            return null;
        }
    }
    public List<Object> getArticleAuthors(String DOI){
        try{
            return articlesRepository.getAllAcceptedArticlesAuthors(DOI);
        }
        catch (Exception exception){
            return null;
        }
    }

    public Page<Articles> getAllAcceptedArticles(int pageNo, int pageSize, Long userID) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Publisher publisher = publisherRepository.getPublisherThroughUserID(userID);
        return articlesRepository.getAllAcceptedArticles(publisher.getPublisherID(),pageable);
    }

    public Page<Articles> getAllRequiredAcceptedArticles(int pageNo, int pageSize, Long userID, String query) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Publisher publisher = publisherRepository.getPublisherThroughUserID(userID);
        return articlesRepository.getAllRequiredAcceptedArticles(query,publisher.getPublisherID(),pageable);
    }
    public Page<Articles> getCitingArticles(int pageNo, int pageSize,  List<String> query) {
        return articlesRepository.getAllCitingArticles(query, PageRequest.of(pageNo, pageSize));
    }
    public String getArticleTitle(String query) {
        return articlesRepository.getArticleTitle(query);
    }

    public Page<Articles> getAllRejectedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllRejectedArticles(pageable);
    }

    public List<Object[]> getTopRecentArticles(){
        return articlesRepository.findTop10ByOrderByPublicationDateDesc();
    }

    public List<Map<String, Object>> getArticles(List<String> DOIs){

        System.out.println("Inside Get Articles Method");
        List<Map<String, Object>> maps = new ArrayList<>();
        for(String DOI: DOIs)
        {
            Map<String, Object> hashMap = new HashMap<>();
            Object[] article = articlesRepository.getArticles(DOI);
            System.out.println("article = " + Arrays.toString(article));
            generatingArticleObject(maps, article, hashMap);
        }
        return maps;
    }

    public List<Map<String, List<String>>> getArticlesTopics(List<String> DOIs){

        List<Map<String, List<String>>> maps = new ArrayList<>();
        for(String DOI: DOIs)
        {
            System.out.println("DOI = " + DOI);
            Map<String, List<String>> hashMap = new HashMap<>();
            List<String> ArticleTopics = articlesRepository.getArticleTopics(DOI);
            hashMap.put(DOI, ArticleTopics);
            maps.add(hashMap);
        }
        return maps;
    }
    public List<String> getArticleTopics(String DOIs){

        return articlesRepository.getArticleTopics(DOIs);
    }
    public List<Object> getArticleTopicsWithID(String DOIs){

        return articlesRepository.getArticleTopicsWithId(DOIs);
    }
    public HashMap<String, String> getArticlePDFWithID(String DOIs){
//        String Status = ;
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("PDF", articlesRepository.getArticlePdfStatusWithId(DOIs));
        return hashMap;
    }

    public ResponseEntity<Articles> getArticleByDOI(String DOI){
        Optional<Articles> articles = articlesRepository.findById(DOI);
        return articles.map(value -> ResponseEntity.status(HttpStatus.OK).body(value)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }

    public List<Map<String, Object>> getSavedArticles(Long userID) {
        List<Map<String, Object>> maps = new ArrayList<>();
        List<Object[]> articles = articlesRepository.getSavedArticles(userID);
        for (Object[] article : articles) {
            Map<String, Object> hashMap = new HashMap<>();
            generatingArticleObject(maps, article, hashMap);
        }
        return maps;
    }
    public List<String> getSavedArticleIDs(Long userID) {
        return articlesRepository.getSavedArticleIDs(userID);
    }
    private void generatingArticleObject(List<Map<String, Object>> maps, Object[] article, Map<String, Object> hashMap) {
        hashMap.put("paperDOI", article[0]);
        hashMap.put("paperTitle", article[1]);
        hashMap.put("paperAbstract", article[2]);
        hashMap.put("paperURL", article[3]);
        hashMap.put("paperJournal", article[4]);
        hashMap.put("paperYear", article[5]);
        hashMap.put("paperPDF", article[6]);
        maps.add(hashMap);
    }




}
