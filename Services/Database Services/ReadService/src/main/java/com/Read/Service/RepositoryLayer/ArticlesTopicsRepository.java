package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.ArticleTopics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesTopicsRepository extends JpaRepository<ArticleTopics, Long> {
    @Query("SELECT rt.ResearchTopic FROM ArticleTopics ats " +
            "JOIN Articles t on ats.paper.Paper_DOI = t.Paper_DOI " +
            "JOIN ResearchTopic rt on rt.ResearchTopicID = ats.topic.ResearchTopicID " +
            "GROUP BY ats.topic.ResearchTopicID ORDER BY COUNT(rt.ResearchTopic) DESC LIMIT 10")
    List<String> findTopResearchTopics();
}
