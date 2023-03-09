package com.JPA.Entities.Neo.Author;


import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.awt.print.Paper;
import java.util.List;

@Node("Author")
public class AuthorEntity {
    @Id
    @Property("AuthorID")
    private String authorId;

    @Property("Name")
    private String name;

    @Relationship(type = "AUTHORED_BY", direction = Relationship.Direction.OUTGOING)
    private List<Paper> papers;
}
