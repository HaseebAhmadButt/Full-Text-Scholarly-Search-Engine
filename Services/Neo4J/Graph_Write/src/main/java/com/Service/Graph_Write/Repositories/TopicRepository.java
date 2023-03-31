package com.Service.Graph_Write.Repositories;

import com.JPA.Entities.Neo.Topic.TopicEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TopicRepository extends Neo4jRepository<TopicEntity, Long> {
}
