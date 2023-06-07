package com.Read.Service.ServiceLayer;

import com.Read.Service.RepositoryLayer.ArticlesRepository;
import com.Read.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private ArticlesRepository articlesRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public HashMap<String, List<Object[]>> getStats(){
        List<Object[]> articles = articlesRepository.getArticlesStats();
        
        List<Object[]> publisher = publisherRepository.getAuthorStats();
        System.out.println("Arrays.asList(publisher) = " + Arrays.asList(publisher));
        List<Object[]> journal = articlesRepository.getJournalStats();
        System.out.println("journal = " + Arrays.asList(journal));
        List<Object[]> articleYear = articlesRepository.getArticleYearStats();
        System.out.println("articleYear = " + Arrays.asList(articleYear));
        HashMap<String, List<Object[]>> hashMap = new HashMap<>();
        hashMap.put("articleStats", articles);
        hashMap.put("publisherStats", publisher);
        hashMap.put("journalStats", journal);
        hashMap.put("articleYearData", articleYear);
        return hashMap;
    }

}
