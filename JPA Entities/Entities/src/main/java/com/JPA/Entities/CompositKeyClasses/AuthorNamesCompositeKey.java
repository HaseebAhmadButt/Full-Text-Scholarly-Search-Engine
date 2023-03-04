package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Publisher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AuthorNamesCompositeKey implements Serializable {
    private Publisher authorId;
    private String PublishedName;
}
