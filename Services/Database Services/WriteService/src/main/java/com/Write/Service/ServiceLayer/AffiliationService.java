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
}
