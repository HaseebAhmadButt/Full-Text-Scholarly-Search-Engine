package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Journal;
import com.Write.Service.RepositoryLayer.ArticlesRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private JournalService journalService;

    @Autowired
    private ArticlesTopicService articlesTopicService;

    @Autowired
    private PaperAuthorsService paperAuthorsService;


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
            List<String> topics){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("ACCEPTED");
        articles.setPAPER_UPDATE_TYPE("CRAWLED");
        return getString(Link, JournalName, articles, topics);
    }

    public String savePaperCompleteFromUser(String DOI, String Title, String Abstract, String Year, String Link, String JournalName,
                                            List<String> topics,
                                            List<String> authors){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("IN-PROGRESS");
        articles.setPAPER_UPDATE_TYPE("UPLOADED");
        articles.setAuthors(authors);
        // This is the place where model will be called to generate topics of Paper and those will be added as List<String>
        // to this Article
        //TODO: Integrate Model With this Service and Generate Topics using Articles "Title" and "Abstract"
//        List<String> topics = Arrays.asList("Topic 1", "Topic 2", "Topic 3");
        return getString(Link, JournalName, articles, topics);
    }
    public String savePaperCompleteFromUserUpload(Long authorID, String DOI, String Title, String Abstract, String Year, String Link, String pdf_name ,String JournalName, List<String> authors){

        Articles articles = new Articles();
        articles.setPaper_DOI(DOI);
        articles.setPaper_Title(Title);
        articles.setPaper_Abstract(Abstract);
        articles.setPublished_Date(Year);
        articles.setPaper_STATUS("IN-PROGRESS");
        articles.setPAPER_UPDATE_TYPE("UPLOADED");
        articles.setPAPER_PDF(pdf_name);
        articles.setAuthors(authors);
        // This is the place where model will be called to generate topics of Paper and those will be added as List<String>
        // to this Article
        //TODO: Integrate Model With this Service and Generate Topics using Articles "Title" and "Abstract"
        List<String> topics = Arrays.asList("Topic 1", "Topic 2", "Topic 3");
        getString(Link, JournalName, articles, topics);
        return paperAuthorsService.saveAuthors(authorID, Collections.singletonList(DOI));
    }

    @NotNull
    private String getString(String Link, String JournalName, Articles articles, List<String> topics) {
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
