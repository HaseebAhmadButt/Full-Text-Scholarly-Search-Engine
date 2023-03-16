package com.JPA.Entities.Neo.Author;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.awt.print.Paper;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
