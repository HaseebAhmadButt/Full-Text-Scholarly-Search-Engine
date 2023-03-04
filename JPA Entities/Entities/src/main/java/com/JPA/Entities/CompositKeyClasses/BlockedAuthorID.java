package com.JPA.Entities.CompositKeyClasses;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Publisher;

import java.io.Serializable;

public class BlockedAuthorID implements Serializable {
    private Publisher authorId;
    private Admin AdminId;
}
