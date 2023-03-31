package com.Read.Service.ServiceLayer;


import com.JPA.Entities.Beans.Publisher;
import com.Read.Service.RepositoryLayer.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;
    public Page<Publisher> getAllPublishers(int pageNo, int pageSize){
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return publisherRepository.findAll(pageable);
    }

}
