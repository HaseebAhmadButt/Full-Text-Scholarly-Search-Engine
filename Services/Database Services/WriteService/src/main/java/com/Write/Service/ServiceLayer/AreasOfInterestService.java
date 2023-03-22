package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import com.Write.Service.RepositoryLayer.AreasOfInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreasOfInterestService {

    @Autowired
    private AreasOfInterestRepository areasOfInterestRepository;
    public boolean saveAreasOfInterest(String[] listOfInterests, Publisher publisher){
        List<AreasOfInterests> areasOfInterests = new ArrayList<>();
        for (String interest : listOfInterests) {
            AreasOfInterests areaOfInterest = new AreasOfInterests();
            areaOfInterest.setAuthorId(publisher);
            areaOfInterest.setAreaOfInterest(interest);
            areasOfInterests.add(areaOfInterest);
        }
         List<AreasOfInterests>  areasOfInterests1 = areasOfInterestRepository.saveAll(areasOfInterests);
        if (!areasOfInterests1.isEmpty()){
            return true;
        }
        return false;
    }
}
