package com.JPA.Entities.CompositBeans;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.ResearchTopic;
import com.JPA.Entities.CompositKeyClasses.ArticleTopicsID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ARTICLE_TOPICS")
@Entity
//@IdClass(ArticleTopicsID.class)
public class ArticleTopics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Id
    @ManyToOne
    @JoinColumn(name = "PAPER_DOI", referencedColumnName = "DOI")
    private Articles paper;


//    @Id
    @ManyToOne
    @JoinColumn(name = "RESEARCH_TOPIC_ID", referencedColumnName = "RESEARCH_TOPIC_ID")
    private ResearchTopic topic;
}
