package com.Service.Graph_Read.Repositories;

import com.JPA.Entities.Neo.Author.AuthorEntity;

import com.JPA.Entities.Neo.Paper.PaperEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends Neo4jRepository<AuthorEntity, Long> {

    @Query("MATCH (n:ArticleAuthors{AuthorID:$AuthorID})-[r:AUTHORED_BY]->(m:Article) RETURN m")
    List<PaperEntity> getPapersOfSpecificAuthor(String AuthorID);
}
