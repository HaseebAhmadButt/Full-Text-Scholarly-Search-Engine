package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.User;

import java.io.Serializable;

public class SavedArticlesID implements Serializable {
    private User user;
    private Articles paper;
}
