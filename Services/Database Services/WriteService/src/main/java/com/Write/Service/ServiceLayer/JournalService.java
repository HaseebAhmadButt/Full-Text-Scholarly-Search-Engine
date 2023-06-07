package com.Write.Service.ServiceLayer;

//import com.JPA.Entities.Beans.Affiliations;
import com.JPA.Entities.Beans.Journal;
import com.Write.Service.RepositoryLayer.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JournalService {

    @Autowired
    private JournalRepository journalRepository;

//    public Journal FindOrCreateJournal(String Name){
//        Journal journal = journalRepository.findByJournalName(Name);
//        if (journal == null) {
//            journal = new Journal();
//            journal.setJournalName(Name);
//            journalRepository.save(journal);
//        }
//        return journal;
//    }


    public Journal FindOrCreateJournal(String name){
        System.out.println("name = " + name);
        Journal journal = journalRepository.findThroughName(name.trim());
        System.out.println("journal = " + journal);
        try{
            if (journal == null) {
                journal = new Journal();
                journal.setJournalName(name);
                journalRepository.save(journal);
            }
            return journal;
        }
        catch (Exception exception){

            return journal;
        }
    }

}
