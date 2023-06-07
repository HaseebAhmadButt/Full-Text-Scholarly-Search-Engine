package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import jakarta.persistence.OrderBy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesRepository extends JpaRepository<Articles, String> {
    @Query("SELECT rt.ResearchTopic, t.Paper_Title, t.Paper_Abstract, t.Paper_URL, t.Paper_DOI FROM ArticleTopics ats " +
            "JOIN Articles t on ats.paper.Paper_DOI = t.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = ats.topic.ResearchTopicID " +
            "WHERE t.Paper_STATUS = 'ACCEPTED'" +
            "GROUP BY t.Paper_DOI ORDER BY t.createdDate DESC LIMIT 10")
    List<Object[]> findTop10ByOrderByPublicationDateDesc();

    @Query("SELECT ar.Paper_DOI,ar.Paper_Title, ar.Paper_Abstract, ar.Paper_URL, jr.journalName, ar.Published_Date, COUNT(*) as Citations FROM Articles ar " +
            "JOIN Journal jr on jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_DOI = ?1")
    Object[] getArticles(String DOI);

//    This is used to get all article topics
    @Query("SELECT art.topic.ResearchTopic FROM Articles ar JOIN ArticleTopics art on ar.Paper_DOI = art.paper.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = art.topic.ResearchTopicID WHERE ar.Paper_DOI = ?1" +
            " GROUP BY rt.ResearchTopic")
    List<String> getArticleTopics(String DOI);
    @Query("SELECT rt.ResearchTopicID, rt.ResearchTopic FROM Articles ar " +
            "JOIN ArticleTopics art on ar.Paper_DOI = art.paper.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = art.topic.ResearchTopicID WHERE ar.Paper_DOI = ?1" +
            " GROUP BY rt.ResearchTopic")
    List<Object> getArticleTopicsWithId(String DOI);
    @Query("SELECT ar.PAPER_PDF FROM Articles ar " +
            "WHERE ar.Paper_DOI = ?1")
    String getArticlePdfStatusWithId(String DOI);

    @Query("SELECT pu.PublisherID, pu.PublisherName FROM Articles ar " +
            "JOIN PaperAuthors pa on ar.Paper_DOI = pa.paper.Paper_DOI " +
            "JOIN Publisher pu on pu.PublisherID = pa.author.PublisherID " +
            "WHERE ar.Paper_DOI = ?1 " +
            "AND pu.PublisherStatus = 'ACTIVE'")
    List<Object> getAllAcceptedArticlesAuthors(String DOI);


    @Query("SELECT ar.Paper_DOI,ar.Paper_Title, ar.Paper_Abstract, ar.Paper_URL, jr.journalName, ar.Published_Date, ar.PAPER_PDF " +
            "FROM Articles ar JOIN Journal jr on jr.id = ar.Paper_Journal.id " +
            "JOIN SavedArticles sa on sa.paper.Paper_DOI = ar.Paper_DOI " +
            "JOIN User u on u.id = sa.user.id " +
            "WHERE u.id = :userID " +
            "GROUP BY ar.Paper_DOI")
    List<Object[]> getSavedArticles(@Param("userID") Long userID);
    @Query("SELECT ar.Paper_DOI " +
            "FROM Articles ar JOIN Journal jr on jr.id = ar.Paper_Journal.id " +
            "JOIN SavedArticles sa on sa.paper.Paper_DOI = ar.Paper_DOI " +
            "JOIN User u on u.id = sa.user.id " +
            "WHERE u.id = :userID " +
            "GROUP BY ar.Paper_DOI")
    List<String> getSavedArticleIDs(@Param("userID") Long userID);


    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'IN-PROGRESS' and ar.PAPER_UPDATE_TYPE = 'UPLOADED' ORDER BY ar.Published_Date ASC ")
    Page<Articles> getAllAddedArticles(Pageable pageable);

    @Query("SELECT ar, da.reason FROM Articles ar " +
            "JOIN DeletedArticles da ON da.DOI.Paper_DOI = ar.Paper_DOI " +
            "WHERE ar.Paper_STATUS = 'REJECTED' " +
            "AND ar.PAPER_UPDATE_TYPE = 'UPLOADED' ORDER BY ar.Published_Date ASC ")
    Page<Object[]> getAllAddedRejectedArticles(Pageable pageable);

    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'ACCEPTED' and ar.PAPER_UPDATE_TYPE = 'UPLOADED' ORDER BY ar.Published_Date ASC ")
    Page<Articles> getAllAddedAcceptedArticles(Pageable pageable);

    /*
    SELECT *
    FROM articles ar
    JOIN journal jr ON jr.journal_id = ar.journal_id
    WHERE ar.paper_status = 'ACCEPTED'
    AND ar.paper_update_type = 'UPLOADED'
    AND (ar.paper_title LIKE '%learning%' OR jr.journal_name LIKE '%learning%');
     */
    @Query("SELECT ar " +
            "FROM  Articles ar " +
            "JOIN  Journal jr ON jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_STATUS = 'ACCEPTED' AND ar.PAPER_UPDATE_TYPE = 'UPLOADED' " +
            "AND  (ar.Paper_Title LIKE %?1% OR jr.journalName LIKE %?1%) ORDER BY ar.Published_Date ASC ")
    Page<Articles> getAllAddedAcceptedArticlesWithParameters(String query,Pageable pageable);
    @Query("SELECT ar " +
            "FROM  Articles ar " +
            "JOIN  Journal jr ON jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_STATUS = 'IN-PROGRESS' and ar.PAPER_UPDATE_TYPE = 'UPLOADED' " +
            "AND  (ar.Paper_Title LIKE %?1% OR jr.journalName LIKE %?1%) ORDER BY ar.Published_Date ASC")
    Page<Articles> getAllAddedArticlesWithParameters(String query,Pageable pageable);
    @Query("SELECT ar, da.reason " +
            "FROM  Articles ar " +
            "JOIN DeletedArticles da on da.DOI.Paper_DOI = ar.Paper_DOI " +
            "JOIN  Journal jr ON jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_STATUS = 'REJECTED' and ar.PAPER_UPDATE_TYPE = 'UPLOADED' " +
            "AND  (ar.Paper_Title LIKE %?1% OR jr.journalName LIKE %?1%) ORDER BY ar.Published_Date ASC")
    Page<Object[]> getAllAddedRejectedArticlesWithParameters(String query,Pageable pageable);


    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'ACCEPTED' " +
            "AND ar.Paper_DOI NOT IN (SELECT pa.paper.Paper_DOI FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pu.PublisherID = pa.author.PublisherID" +
            " WHERE pu.PublisherID = ?1)")
    Page<Articles> getAllAcceptedArticles(Long publisherID, Pageable pageable);

    @Query("SELECT ar FROM Articles ar " +
            "WHERE ar.Paper_STATUS = 'ACCEPTED' " +
            "AND ar.Paper_Title LIKE %?1%" +
            "AND ar.Paper_DOI NOT IN (SELECT pa.paper.Paper_DOI FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pu.PublisherID = pa.author.PublisherID" +
            " WHERE pu.PublisherID = ?2)")
    Page<Articles> getAllRequiredAcceptedArticles(String query, Long publisherID, Pageable pageable);




    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'REJECTED'")
    Page<Articles> getAllRejectedArticles(Pageable pageable);


    @Query("SELECT ar.Paper_DOI ,ar.createdDate, ar.Paper_Title, ar.Paper_Abstract, ar.Paper_STATUS " +
            "FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pa.author.PublisherID = pu.PublisherID AND pu.PublisherID = ?1 " +
            "JOIN Articles ar on pa.paper.Paper_DOI = ar.Paper_DOI " +
            "AND ar.PAPER_UPDATE_TYPE = 'UPLOADED'" +
            "ORDER BY ar.createdDate DESC ")
    Page<List<Object>> getAllUploadedArticlesBySpecificPublisher(Long publisherID, Pageable pageable);

    @Query("SELECT ar.Paper_DOI, ar.Published_Date ,ar.PAPER_PDF, ar.Paper_Title, ar.Paper_Abstract, jr.journalName " +
            "FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pa.author.PublisherID = pu.PublisherID AND pu.PublisherID = ?1 " +
            "JOIN Articles ar on pa.paper.Paper_DOI = ar.Paper_DOI " +
            "JOIN Journal jr ON jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_STATUS = 'ACCEPTED'" +
            "ORDER BY ar.createdDate DESC ")
    Page<List<Object>> getAllAcceptedArticlesBySpecificPublisher(Long publisherID, Pageable pageable);
    @Query("SELECT ar.Paper_DOI, ar.Published_Date, ar.PAPER_PDF, ar.Paper_Title, ar.Paper_Abstract, jr.journalName " +
            "FROM PaperAuthors pa " +
            "JOIN Publisher pu ON pa.author.PublisherID = pu.PublisherID AND pu.PublisherID = ?1 " +
            "JOIN Articles ar ON pa.paper.Paper_DOI = ar.Paper_DOI " +
            "JOIN Journal jr ON jr.id = ar.Paper_Journal.id " +
            "WHERE ar.Paper_STATUS = 'ACCEPTED' " +
            "AND (ar.Paper_Title LIKE %?2% OR ar.Paper_Abstract LIKE %?2%) " +
            "ORDER BY ar.createdDate DESC ")
    Page<List<Object>> getAllAcceptedArticlesBySpecificPublisher(Long publisherID,  String query, Pageable pageable);



    @Query("SELECT ar.Paper_STATUS, count(*)FROM Articles ar GROUP BY ar.Paper_STATUS")
    List<Object[]> getArticlesStats();

    @Query("SELECT jr.journalName, COUNT(*) FROM Articles ar " +
            "JOIN Journal jr on ar.Paper_Journal.id = jr.id " +
            "GROUP BY jr.journalName")
    List<Object[]> getJournalStats();

    @Query("SELECT ar.Published_Date, ar.Paper_STATUS, COUNT(*) FROM Articles ar " +
            "GROUP BY ar.Published_Date, ar.Paper_STATUS")
    List<Object[]> getArticleYearStats();

    @Query("SELECT ar FROM Articles ar WHERE ar.Paper_STATUS = 'ACCEPTED' AND ar.Paper_DOI IN (:DOIs)")
    Page<Articles> getAllCitingArticles(@Param("DOIs") List<String> DOIs, Pageable pageable);

    @Query("SELECT ar.Paper_Title FROM Articles ar WHERE ar.Paper_DOI = ?1 ")
    String getArticleTitle(String DOIs);

}
