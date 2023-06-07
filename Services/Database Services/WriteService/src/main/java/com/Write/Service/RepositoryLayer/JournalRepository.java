package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

    @Query("SELECT jr from Journal jr where jr.journalName=?1")
    Journal findThroughName(String journalName);
}
