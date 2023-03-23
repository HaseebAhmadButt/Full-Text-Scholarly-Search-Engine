package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Journal;
import com.Write.Service.RepositoryLayer.ArticlesRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private JournalService journalService;

    @Autowired
    private ArticlesTopicService articlesTopicService;


    public Articles getArticleByID(String DOI){
        return articlesRepository.findById(DOI).get();
    }

    public Articles FindOrCreateArticle(String DOI, String Title){
        Articles article = this.getArticleByID(DOI);
        if(article==null){
           article = this.savePaperWithDefaultFields(DOI, Title);
        }
        return articlesRepository.save(article);
    }
    public Articles savePaperWithDefaultFields(String DOI, String Title){
        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_STATUS("ACCEPTED");
        return articlesRepository.save(articles);
//        if(articles1==null){
//            return "FAILED";
//        }
//        return "OK";
    }
    public String UpdatePaperAbstract(String DOI, String Abstract){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_Abstract(Abstract);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperYear(String DOI, String Year){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPublished_Date(Year);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperURL(String DOI, String URL){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_URL(URL);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperStatus(String DOI, String Status){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        articles.setPaper_STATUS(Status);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String UpdatePaperJournal(String DOI, String JournalName){
        Articles articles = articlesRepository.findById(DOI).get();
        if(articles==null){
            return "FAILED";
        }
        Journal journal = journalService.FindOrCreateJournal(JournalName);
        articles.setPaper_Journal(journal);
        Articles articles1 =  articlesRepository.save(articles);
        if(articles1==null){
            return "FAILED";
        }
        return "OK";
    }
    public String savePaperCompleteFromCrawler(
            String DOI,
            String Title,
            String Abstract,
            String Year,
            String Link,
            String JournalName,
            String[] topics){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Title(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("ACCEPTED");
        articles.setPAPER_UPDATE_TYPE("CRAWLED");
        return getString(Link, JournalName, articles, topics);
    }

    public String savePaperCompleteFromUser(
            String DOI,
            String Title,
            String Abstract,
            String Year,
            String Link,
            String JournalName,
            String[] topics){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Title(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("IN-PROGRESS");
        articles.setPAPER_UPDATE_TYPE("UPLOADED");
        return getString(Link, JournalName, articles, topics);
    }

    @NotNull
    private String getString(String Link, String JournalName, Articles articles, String[] topics) {
        articles.setPaper_URL(Link);
        if(JournalName.equals("")){
            articles.setPaper_Journal(null);
        }
        else {
            Journal journal = journalService.FindOrCreateJournal(JournalName);
            articles.setPaper_Journal(journal);
        }
        articlesRepository.save(articles);
        articlesTopicService.saveArticles(topics,articles);

        return "OK";
    }



}
