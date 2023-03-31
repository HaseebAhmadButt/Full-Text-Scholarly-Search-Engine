package com.Service.Graph_Write.Repositories;

import com.JPA.Entities.Neo.Paper.PaperEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends Neo4jRepository<PaperEntity, String> {
}
