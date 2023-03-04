package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Publisher;

import java.io.Serializable;

public class AreasOfInterestID implements Serializable {
    private Publisher authorId;
    private String areaOfInterest;
}
