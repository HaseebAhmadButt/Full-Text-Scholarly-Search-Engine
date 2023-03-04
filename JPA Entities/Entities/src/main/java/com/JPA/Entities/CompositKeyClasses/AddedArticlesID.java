package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;

import java.io.Serializable;

public class AddedArticlesID implements Serializable {
    private Admin adminId;
    private Articles DOI;
}
