package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Affiliations;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    public Publisher savePublication(String publisherEmail, float hIndex, float hMedian, String publisherName, String publisherWebsite, Affiliations affiliation, User userID) {
        Publisher publisher = new Publisher();
        publisher.setPublisherEmail(publisherEmail);
        publisher.setPublisherHIndex(hIndex);
        publisher.setPublisherHMedian(hMedian);
        publisher.setPublisherName(publisherName);
        publisher.setPublisherSite(publisherWebsite);
        publisher.setAffiliationID(affiliation);
        publisher.setUserID(userID);

        publisherRepository.save(publisher);
        return publisher;
    }
}
