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
    @Query("MATCH (p2:Article)-[:Cites]->(:Article {PaperID: $paperId}) return p2.PaperID")
    List<String> findPapersIDs(String paperId);

    @Query("MATCH (a:Article) WHERE a.PaperID IN $articleIds RETURN { paperId: a.PaperID, articleRank: a.articleRank } as result")
    List<Map<String, Object>> getArticleCentrality(List<String> articleIds);
//    @Query("MATCH (a:Article) WHERE a.PaperID IN $articleIds RETURN a.PaperID as paperId, a.articleRank as articleRank")
//    List<Object> getArticleCentrality(List<String> articleIds);

    @Query("CALL gds.graph.project(" +
            "  'myGraph'," +
            "  'Article'," +
            "  {" +
            "    orientation:'Cites'" +
            "  }" +
            ")")
    void createInnerGraph();
    @Query("CALL gds.articleRank.write('myGraph', {" +
            "  writeProperty: 'articleRank'" +
            "})")
    void writeScoresToNodes();
    @Query("CALL gds.graph.drop('myGraph')")
    void deleteTheGraph();




}
