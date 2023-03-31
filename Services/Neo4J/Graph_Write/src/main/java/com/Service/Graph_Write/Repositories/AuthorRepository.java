package com.Service.Graph_Write.Repositories;

import com.JPA.Entities.Neo.Author.AuthorEntity;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends Neo4jRepository<AuthorEntity, Long> {
}
