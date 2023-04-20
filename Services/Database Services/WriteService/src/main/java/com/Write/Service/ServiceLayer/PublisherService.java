package com.Write.Service.ServiceLayer;

//import com.JPA.Entities.Beans.Affiliations;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Write.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Optional;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;
//    @Autowired
//    private AffiliationService affiliationService;
    @Autowired
    private UserService userService;

    @Autowired
    private AuthorNamesService authorNamesService;

    @Autowired
    private AreasOfInterestService areasOfInterestService;

    public Publisher getPublisher(Long ID){
        return publisherRepository.findById(ID).get();
    }
    public String savePublisher(String publisherName, Long userID){
        User user = userService.getUser(userID);
        Publisher publisher = new Publisher();
        publisher.setPublisherName(publisherName);
        publisher.setUserID(user);
        Publisher savedPublisher = publisherRepository.save(publisher);

        if (savedPublisher != null) {
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String savePublisher(String publisherName, String publisherEmail ,Long userID){
        User user = userService.getUser(userID);
        Publisher publisher = new Publisher();
        publisher.setPublisherName(publisherName);
        publisher.setPublisherEmail(publisherEmail);
        publisher.setUserID(user);
        Publisher savedPublisher = publisherRepository.save(publisher);

        if (savedPublisher.getPublisherID() != null) {
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }




    public String updatePublisherEmail(Long ID, String Email){
        Optional<Publisher> publisher = publisherRepository.findById(ID);

        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setPublisherEmail(Email);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String updatePublisherWebsite(Long ID, String websiteLink){
        Optional<Publisher> publisher = publisherRepository.findById(ID);

        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setPublisherSite(websiteLink);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

//    public String updatePublisherAffiliationName(Long ID, String websiteLink){
//        Optional<Publisher> publisher = publisherRepository.findById(ID);
//
//        if (publisher.isPresent()) {
//            Publisher publisher1 = publisher.get();
//            publisher1.setPublisherSite(websiteLink);
//            publisherRepository.save(publisher1);
//            return "OK";
//            // Publisher is saved successfully
//        }
//        return "FAILED";
//    }









    public String updatePublisherHIndex(Long ID, double hIndex){
        Optional<Publisher> publisher = publisherRepository.findById(ID);

        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setPublisherHIndex(hIndex);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String updatePublisherHMedian(Long ID, double hMedian){
        Optional<Publisher> publisher = publisherRepository.findById(ID);

        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setPublisherHMedian(hMedian);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String updatePublisherAffiliationName(Long ID, String name){
        Optional<Publisher> publisher = publisherRepository.findById(ID);
        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setAffiliationName(name);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String updatePublisherCompleteAffiliation(Long ID, String name, String Link){
        Optional<Publisher> publisher = publisherRepository.findById(ID);
        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setAffiliationName(name);
            publisher1.setAffiliationLink(Link);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }

    public String updatePublisherAffiliationLink(Long ID, String link){
        Optional<Publisher> publisher = publisherRepository.findById(ID);
        if (publisher.isPresent()) {
            Publisher publisher1 = publisher.get();
            publisher1.setAffiliationLink(link);
            publisherRepository.save(publisher1);
            return "OK";
            // Publisher is saved successfully
        }
        return "FAILED";
    }
    public String createFilledProfile(
            String email,
            String name,
            String link,
            String affiliationName,
            String affiliationLink,
            List<String> authorNames,
            List<String> areasOfInterest,
            Long userID
    ) {

        try {

            // Check if a publisher with the given userID already exists in the database
            Publisher publisher1 = publisherRepository.getPublisherByUserID(userID);
            // Check if a publisher with the given email already exists in the database
            Publisher publisher = publisherRepository.getPublisherByEmail(email);

            // If a publisher with the given userID already exists
            if (publisher1 != null) {
                // Check if the publisher with the given email is the same as the publisher with the given userID
                if(publisher != null && publisher.getUserID()!=publisher1.getUserID()){
                    // If they are different, return "Conflict"
                    return "Conflict";
                }
                // If the publisher with the given email is the same as the publisher with the given userID,
                // update the existing publisher with the new information
                publisher = updatePublisher(email, name, link, affiliationName, affiliationLink, userID, publisher1);

                // If a publisher with the given userID does not exist
            } else {
                // Check if a publisher with the given email already exists
                if(publisher!=null){
                    // If a publisher with the given email already exists, return "Conflict"
                    return "Conflict";
                }
                // If a publisher with the given email does not exist, create a new publisher with the given information
                publisher = savePublisher(email, name, link, affiliationName, affiliationLink, userID);
            }

            // Save the author names and areas of interest associated with the publisher
            authorNamesService.saveAuthorNames(authorNames, publisher);
            areasOfInterestService.saveAreasOfInterest(areasOfInterest, publisher);

            // If everything went well, return "OK"
            return "OK";

// If an exception occurred while executing the code above
        } catch (Exception e) {
            // Return "Exception"
            return "Exception";
        }
    }


    public Publisher createFilledProfileWithOutArrays(
            String email,
            String name,
            String link,
            String affiliationName,
            String affiliationLink,
            Long userID
    ){
       return savePublisher(email, name, link, affiliationName, affiliationLink, userID);

        // Publisher is saved successfully
    }
    private Publisher savePublisher(String email, String name, String link, String affiliationName, String affiliationLink, Long userID) {
        User user = userService.getUser(userID);
        Publisher publisher = new Publisher();
        publisher.setPublisherEmail(email);
        publisher.setPublisherName(name);
        publisher.setPublisherSite(link);
        publisher.setAffiliationName(affiliationName);
        publisher.setAffiliationLink(affiliationLink);
        publisher.setPublisherStatus("ACTIVE");
        publisher.setUserID(user);

       return publisherRepository.save(publisher);
    }
    private Publisher updatePublisher(String email, String name, String link, String affiliationName, String affiliationLink, Long userID, Publisher publisher) {
//        User user = userService.getUser(userID);
//        Publisher publisher = new Publisher();
        publisher.setPublisherEmail(email);
        publisher.setPublisherName(name);
        publisher.setPublisherSite(link);
        publisher.setAffiliationName(affiliationName);
        publisher.setAffiliationLink(affiliationLink);
//        publisher.setUserID(user);

       return publisherRepository.save(publisher);
    }





//    public String createCompleteProfile(
//            String email,
//            String name,
//            String link,
//            Long affiliationID,
//            Long userID
//    ){
//        User user = userService.getUser(userID);
//        Affiliations affiliations = affiliationService.getAffiliations(affiliationID);
//        Publisher publisher = new Publisher();
//        publisher.setPublisherEmail(email);
//        publisher.setPublisherName(name);
//        publisher.setPublisherSite(link);
////        publisher.setAffiliationID(affiliations);
//        publisher.setUserID(user);
//
//        if (publisherRepository.save(publisher) != null) {
//            return "OK";
//            // Publisher is saved successfully
//        }
//        return "FAILED";
//    }






}
