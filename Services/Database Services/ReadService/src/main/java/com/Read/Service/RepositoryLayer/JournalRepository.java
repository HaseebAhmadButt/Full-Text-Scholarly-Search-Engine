package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

//  Have a look at method declaration
//    Journal findByJournalName(String journalName);
}
