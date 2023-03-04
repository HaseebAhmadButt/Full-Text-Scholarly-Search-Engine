package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Articles;

import java.io.Serializable;

public class ReferencesID implements Serializable {
    private Articles articleId;
    private Articles articleI2;
}
