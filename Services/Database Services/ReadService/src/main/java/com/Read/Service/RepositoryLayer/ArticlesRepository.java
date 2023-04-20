package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import jakarta.persistence.OrderBy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, String> {
    @Query("SELECT rt.ResearchTopic, t.Paper_Title, t.Paper_Abstract, t.Paper_URL FROM ArticleTopics ats " +
            "JOIN Articles t on ats.paper.Paper_DOI = t.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = ats.topic.ResearchTopicID " +
            "GROUP BY ats.topic.ResearchTopicID ORDER BY t.createdDate DESC LIMIT 10")
    List<Object[]> findTop10ByOrderByPublicationDateDesc();

    @Query("SELECT ar.Paper_DOI,ar.Paper_Title, ar.Paper_Abstract, ar.Paper_URL, jr.journalName, ar.Published_Date, COUNT(*) as Citations FROM Articles ar " +
            "JOIN Journal jr on jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_DOI = ?1")
    Object[] getArticles(String DOI);

//            "JOIN References pr ON pr.articleI2.Paper_DOI = ar.Paper_DOI " +
//            "GROUP BY pr.articleI2.Paper_DOI "
//

    @Query("SELECT art.topic.ResearchTopic FROM Articles ar JOIN ArticleTopics art on ar.Paper_DOI = art.paper.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = art.topic.ResearchTopicID WHERE ar.Paper_DOI = ?1" +
            " GROUP BY rt.ResearchTopic")
    List<String> getArticleTopics(String DOI);


    @Query("SELECT ar.Paper_DOI ,ar.Paper_Title, ar.Paper_Abstract, ar.Paper_URL, jr.journalName, ar.Published_Date, COUNT(*) as Citations " +
            "FROM Articles ar JOIN Journal jr on jr.id = ar.Paper_Journal.id " +
            "JOIN SavedArticles sa on sa.paper.Paper_DOI = ar.Paper_DOI " +
            "JOIN User u on u.id = ?1 ")
    List<Object[]> getSavedArticles(Long userID);
//  "JOIN References pr ON pr.articleI2.Paper_DOI  = ar.Paper_DOI " +
//  GROUP BY pr.articleI2.Paper_DOI

    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'IN-PROGRESS'")
    Page<Articles> getAllAddedArticles(Pageable pageable);


    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'ACCEPTED' " +
            "AND ar.Paper_DOI NOT IN (SELECT pa.paper.Paper_DOI FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pu.PublisherID = pa.author.PublisherID" +
            " WHERE pu.PublisherID = ?1)")
    Page<Articles> getAllAcceptedArticles(Long publisherID, Pageable pageable);

    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'REJECTED'")
    Page<Articles> getAllRejectedArticles(Pageable pageable);


}
//
