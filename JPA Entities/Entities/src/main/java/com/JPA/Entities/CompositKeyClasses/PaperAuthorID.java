package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;

import java.io.Serializable;

public class PaperAuthorID implements Serializable {
    private Articles paper;
    private Publisher author;
}
