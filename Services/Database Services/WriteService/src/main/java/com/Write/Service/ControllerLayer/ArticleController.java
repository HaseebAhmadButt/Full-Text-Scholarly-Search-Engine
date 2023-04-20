package com.Write.Service.ControllerLayer;

import com.Write.Service.ServiceLayer.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
/*
{
  "Title": "A Study on Deep Learning for Image Classification",
  "Abstract": "This paper presents a study on the use of deep learning techniques for image classification tasks. We compare the performance of several deep learning models on a variety of benchmark datasets and provide insights into the strengths and weaknesses of each approach.",
  "Year": "2021",
  "Link": "https://example.com/paper1",
  "JournalName": "IEEE Transactions on Pattern Analysis and Machine Intelligence",
  "Topics": ["Deep Learning", "Image Classification"],
  "Authors": ["John Smith", "Jane Doe", "Bob Johnson"]
},
{
"Title": "Natural Language Processing for Sentiment Analysis",
"Abstract": "This paper explores the use of natural language processing techniques for sentiment analysis. We evaluate the performance of several state-of-the-art algorithms on a variety of datasets and provide recommendations for future research.",
"Year": "2020",
"Link": "https://example.com/paper2",
"JournalName": "ACM Transactions on Intelligent Systems and Technology",
"Topics": ["Natural Language Processing", "Sentiment Analysis"],
"Authors": ["Alice Brown", "David Lee"]
},
{
"Title": "A Comparison of Supervised and Unsupervised Learning Algorithms for Clustering",
"Abstract": "This paper compares the performance of supervised and unsupervised learning algorithms for clustering tasks. We evaluate several algorithms on a variety of benchmark datasets and provide insights into the strengths and weaknesses of each approach.",
"Year": "2022",
"Link": "https://example.com/paper3",
"JournalName": "Journal of Machine Learning Research",
"Topics": ["Machine Learning", "Clustering"],
"Authors": ["Emily Chen", "Jack Wilson", "Michael Kim"]
},
{
"Title": "A Survey of Reinforcement Learning Techniques for Robotics",
"Abstract": "This paper presents a survey of reinforcement learning techniques for robotics. We review the state-of-the-art algorithms and applications of reinforcement learning in robotics, and identify key challenges and opportunities for future research.",
"Year": "2021",
"Link": "https://example.com/paper4",
"JournalName": "Robotics and Autonomous Systems",
"Topics": ["Reinforcement Learning", "Robotics"],
"Authors": ["Samuel Lee", "Sophia Davis"]
},
{
"Title": "An Overview of Machine Learning Approaches for Time Series Forecasting",
"Abstract": "This paper provides an overview of machine learning approaches for time series forecasting. We review the state-of-the-art algorithms and applications of machine learning in time series forecasting, and provide recommendations for future research.",
"Year": "2020",
"Link": "https://example.com/paper5",
"JournalName": "Expert Systems with Applications",
"Topics": ["Machine Learning", "Time Series Forecasting"],
"Authors": ["Lisa Wong", "Steven Kim", "Brian Johnson"]
}
 */











@RestController
//@CrossOrigin("http://localhost:3000")
public class ArticleController {

    @Autowired
    private ArticlesService articlesService;

    @PostMapping("/saveCrawledArticle")
    public String saveArticlesFromCrawler(@RequestBody Map<String, Object> stringObjectMap){
        return articlesService.savePaperCompleteFromCrawler(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
                (List<String>) stringObjectMap.get("Topics")
        );
    }

    @PostMapping("/saveUploadedArticle")
    public String saveArticlesFromUser(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        System.out.println("stringObjectMap = " + stringObjectMap);
        System.out.println("Received in Controller ");
       return articlesService.savePaperCompleteFromUser(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
                (List<String>) stringObjectMap.get("Topics"),
                (List<String>) stringObjectMap.get("Authors")
        );
    }

    @PostMapping("/UpdatePaperAbstract")
    public String updatePaperAbstract(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperAbstract(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Abstract")
        );
//        return "";
    }

    @PostMapping("/UpdatePaperYear")
    public String updatePaperYear(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperYear(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Year")
        );
//        return "";
    }

    @PostMapping("/UpdatePaperLink")
    public String updatePaperLink(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperURL(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Link")
        );
//        return "";
    }
    @PostMapping("/UpdatePaperJournal")
    public String updatePaperJournal(
            @RequestBody Map<String, Object> stringObjectMap
    ){
       return articlesService.UpdatePaperJournal(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Journal")
        );
//        return "";
    }




}
