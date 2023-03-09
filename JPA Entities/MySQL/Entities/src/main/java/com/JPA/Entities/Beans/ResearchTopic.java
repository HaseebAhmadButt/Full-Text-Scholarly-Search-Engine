package com.JPA.Entities.Beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "RESEARCH_TOPICS")
@Entity
public class ResearchTopic {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "RESEARCH_TOPIC_ID", nullable = false, updatable = false, length = 20, unique = true)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long ResearchTopicID;

    @Column(name = "RESEARCH_TOPIC", length = 100, unique = true)
    private String ResearchTopic;

}
