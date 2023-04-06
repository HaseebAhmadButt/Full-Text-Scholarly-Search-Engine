package com.Service.Graph_Read.Repositories;

import com.JPA.Entities.Neo.Paper.PaperEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PaperRepository extends Neo4jRepository<PaperEntity, String> {
    @Query("MATCH (p2:Article)-[:Cites]->(:Article {PaperID: $paperId}) RETURN p2")
    List<PaperEntity> findPapersThatCitePaper(String paperId);

    @Query("MATCH (p2:Article)<-[:Cites]-(:Article {PaperID: $paperId}) RETURN p2")
    List<PaperEntity> findPapersThisPaperCited(String paperId);

    @Query("MATCH (a:Article) WHERE a.PaperID IN $articleIds RETURN a.centrality as centrality")
    List<Double> getArticleCentrality(List<String> articleIds);


}
