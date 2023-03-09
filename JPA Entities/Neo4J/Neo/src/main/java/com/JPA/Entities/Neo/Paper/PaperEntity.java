package com.JPA.Entities.Neo.Paper;

import com.JPA.Entities.Neo.Author.AuthorEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Node("Paper")
public class PaperEntity {
    @Id
    @Property("PaperID")
    private String paperId;

    @Relationship(type = "Cites", direction = Relationship.Direction.OUTGOING)
    private List<PaperEntity> citedPapers;

    @Relationship(type = "Cites", direction = Relationship.Direction.INCOMING)
    private List<PaperEntity> citingPapers;

    @Relationship(type = "AUTHORED_BY", direction = Relationship.Direction.INCOMING)
    private List<AuthorEntity> authors;
}
