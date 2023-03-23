package com.Write.Service.ControllerLayer;

import com.Write.Service.ServiceLayer.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ArticleController {

    @Autowired
    private ArticlesService articlesService;

    @PostMapping("/saveCrawledArticle")
    public String saveArticlesFromCrawler(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.savePaperCompleteFromCrawler(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
                (String[]) stringObjectMap.get("Topics")
        );
        return "";
    }

    @PostMapping("/saveUploadedArticle")
    public String saveArticlesFromUser(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.savePaperCompleteFromUser(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
                (String[]) stringObjectMap.get("Topics")
        );
        return "";
    }

    @PostMapping("/UpdatePaperAbstract")
    public String updatePaperAbstract(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.UpdatePaperAbstract(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Abstract")
        );
        return "";
    }

    @PostMapping("/UpdatePaperYear")
    public String updatePaperYear(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.UpdatePaperYear(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Year")
        );
        return "";
    }

    @PostMapping("/UpdatePaperLink")
    public String updatePaperLink(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.UpdatePaperURL(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Link")
        );
        return "";
    }
    @PostMapping("/UpdatePaperJournal")
    public String updatePaperJournal(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        articlesService.UpdatePaperJournal(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Journal")
        );
        return "";
    }




}
