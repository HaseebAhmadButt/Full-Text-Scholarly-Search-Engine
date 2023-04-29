package com.Read.Service.ServiceLayer;


import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.RepositoryLayer.AreasOfInterestRepository;
import com.Read.Service.RepositoryLayer.AuthorNamesRepository;
import com.Read.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private AuthorNamesRepository authorNamesRepository;
    @Autowired
    private AreasOfInterestRepository areasOfInterestRepository;
    public Page<Publisher> getAllPublishers(int pageNo, int pageSize){
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return publisherRepository.findAll(pageable);
    }
    public Page<Publisher> getPublishersWitEmail(int pageNo, int pageSize, String email){
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return publisherRepository.getAllPublisherWithEmail(email, pageable);
    }
    public HashMap<String, Object> getPublisherByUserID(Long userID){
//        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Publisher publisher = publisherRepository.getPublisherThroughUserID(userID);
        List<String> names = authorNamesRepository.getAuthorNames(publisher.getPublisherID());
        List<String> interests = areasOfInterestRepository.getAreasOfInterests(publisher.getPublisherID());
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("Publisher", publisher);
        hashMap.put("AuthorNames", names);
        hashMap.put("AreaofInterests", interests);
        return hashMap;
//        return
    }

}
