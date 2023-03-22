package com.Write.Service.ServiceLayer;


import com.JPA.Entities.Beans.Affiliations;
import com.Write.Service.RepositoryLayer.AffiliationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AffiliationService {

    @Autowired
    private AffiliationRepository affiliationRepository;

    public Affiliations findOrCreateAffiliation(String affiliationName, String affiliationLink){

        Affiliations affiliation = affiliationRepository.findByName(affiliationName);
        if (affiliation == null) {
            affiliation = new Affiliations();
            affiliation.setName(affiliationName);
            affiliation.setAffiliation_link(affiliationLink);
            affiliationRepository.save(affiliation);
        }
        return affiliation;
    }

    public Affiliations getAffiliations(Long ID){
        return affiliationRepository.findById(ID).get();
    }

    public String updateAffiliationName(String oldName, String Name){
        Affiliations affiliation = affiliationRepository.findByName(oldName);
        affiliation.setName(Name);
        if(affiliationRepository.save(affiliation) == null)return "OK";
        return "FAILED";
    }

//    public String updateAffiliationLink(String oldLink, String Link){
//        Affiliations affiliation = affiliationRepository.findByAffiliation_link(oldLink);
//        affiliation.setAffiliation_link(Link);
//        if(affiliationRepository.save(affiliation) == null)return "OK";
//        return "FAILED";
//    }

    public String updateAffiliation(String oldName, String newName, String newLink){
        Affiliations affiliation = affiliationRepository.findByName(oldName);
        affiliation.setName(newName);
        affiliation.setName(newLink);
        if(affiliationRepository.save(affiliation) == null)return "OK";
        return "FAILED";
    }
}
