package com.JPA.Entities.Beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USERS")
@Entity
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "USER_ID", unique = true, updatable = false, length = 20)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private Long id;

    @Column(name = "USER_EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "USER_PASSWORD", nullable = false)
    private String password;
    @Column(name = "USER_PICTURE")
    private String picture;
    @Column(name = "ISADMIN", nullable = false)
    private boolean isAdmin;

    public User(String email, String password, String o, boolean b) {
        this.email=email;
        this.password=password;
        this.picture=o;
        this.isAdmin=b;
    }
}


