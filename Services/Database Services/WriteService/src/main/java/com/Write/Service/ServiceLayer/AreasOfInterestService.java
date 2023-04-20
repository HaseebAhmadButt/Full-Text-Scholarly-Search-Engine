package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import com.Write.Service.RepositoryLayer.AreasOfInterestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreasOfInterestService {

    @Autowired
    private AreasOfInterestRepository areasOfInterestRepository;
    @Transactional
    public void saveAreasOfInterest(List<String> listOfInterests, Publisher publisher){
        areasOfInterestRepository.deleteByAuthorNames(publisher.getPublisherID());
        if(!listOfInterests.isEmpty()) {
            List<AreasOfInterests> areasOfInterests = new ArrayList<>();
            for (String interest : listOfInterests) {
                AreasOfInterests areaOfInterest = new AreasOfInterests();
                areaOfInterest.setAuthorId(publisher);
                areaOfInterest.setAreaOfInterest(interest);
                areasOfInterests.add(areaOfInterest);
            }
            List<AreasOfInterests> savedAuthorInterestList;
            try {
                savedAuthorInterestList = areasOfInterestRepository.saveAll(areasOfInterests);
                if (!savedAuthorInterestList.isEmpty()) {
                } else {
                }
            } catch (Exception e) {
                System.out.println("Error occurred: " + e);
                throw e; // Re-throw the exception
            }
        }
    }
}
