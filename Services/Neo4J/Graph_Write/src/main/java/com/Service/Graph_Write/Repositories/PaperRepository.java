package com.Service.Graph_Write.Repositories;

import com.JPA.Entities.Neo.Paper.PaperEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperRepository extends Neo4jRepository<PaperEntity, String> {
    @Query("MATCH (article:Article{PaperID: $doi}) OPTIONAL MATCH (article)-[r]-() DELETE article, r")
    void deleteArticleByDoi(String doi);

    @Query("MATCH (article:Article) WHERE article.PaperID IN $paperIds OPTIONAL MATCH (article)-[r]-() DELETE article, r")
    void deleteArticlesByPaperIds(List<String> paperIds);

    @Query("MATCH (article:Article)-[r:AUTHORED_BY]-() WHERE article.PaperID IN $paperIds DELETE r")
    void deleteAuthorRelationshipsByPaperIds(List<String> paperIds);

}
