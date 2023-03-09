package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.ResearchTopic;

import java.io.Serializable;

public class ArticleTopicsID implements Serializable {
    private Articles paper;
    private ResearchTopic topic;
}
