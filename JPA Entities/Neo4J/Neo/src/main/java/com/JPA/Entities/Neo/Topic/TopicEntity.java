package com.JPA.Entities.Neo.Topic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;

//import java.awt.print.Paper;
import com.JPA.Entities.Neo.Paper.PaperEntity;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("ArticleTopics")
public class TopicEntity {

    @Id
    @Property("TopicID")
    private Long id;

    @Property("Title")
    private String Title;

    @Relationship(type = "BELONGS_TO", direction = Relationship.Direction.INCOMING)
    private List<PaperEntity> papers;

}
