package com.Read.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.RepositoryLayer.ArticlesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;





    public Page<Articles> getAllAddedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAddedArticles(pageable);
    }

    public Page<Articles> getAllAcceptedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllAcceptedArticles(pageable);
    }

    public Page<Articles> getAllRejectedArticles(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return articlesRepository.getAllRejectedArticles(pageable);
    }

    public List<Articles> getTopRecentArticles(){
        return articlesRepository.findTop10ByOrderByPublicationDateDesc();
    }

    public List<Map<String, Object>> getArticles(String[] DOIs){

        List<Map<String, Object>> maps = new ArrayList<>();
        for(String DOI: DOIs)
        {
            Map<String, Object> hashMap = new HashMap<>();
            Object[] article = articlesRepository.getArticles(DOI);
            generatingArticleObject(maps, article, hashMap);
        }
        return maps;
    }

    public List<Map<String, List<String>>> getArticlesTopics(String[] DOIs){

        List<Map<String, List<String>>> maps = new ArrayList<>();
        for(String DOI: DOIs)
        {
            Map<String, List<String>> hashMap = new HashMap<>();
            List<String> ArticleTopics = articlesRepository.getArticleTopics(DOI);
            hashMap.put(DOI, ArticleTopics);
            maps.add(hashMap);
        }
        return maps;
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

    private void generatingArticleObject(List<Map<String, Object>> maps, Object[] article, Map<String, Object> hashMap) {
        hashMap.put("paperDOI", article[0]);
        hashMap.put("paperTitle", article[1]);
        hashMap.put("paperAbstract", article[2]);
        hashMap.put("paperURL", article[3]);
        hashMap.put("paperJournal", article[4]);
        hashMap.put("paperYear", article[5]);
        hashMap.put("paperCitations", article[6]);
        maps.add(hashMap);
    }


}
