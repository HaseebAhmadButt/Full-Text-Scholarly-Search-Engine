package com.JPA.Entities.Beans;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "JOURNAL")
@Entity
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JOURNAL_ID", nullable = false, updatable = false, length = 20, unique = true)
    private Long id;
    @Column(name = "JOURNAL_NAME", nullable = false, length = 500, unique = true)
    private String journalName;

}
