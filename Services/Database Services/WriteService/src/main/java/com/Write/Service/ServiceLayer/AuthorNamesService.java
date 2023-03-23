package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AuthorNames;
import com.Write.Service.RepositoryLayer.AuthorNamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorNamesService {

    @Autowired
    private AuthorNamesRepository authorNamesRepository;

    @Autowired
    private PublisherService publisherService;
    public boolean saveAuthorNames(String[] names, Publisher publisher){
        authorNamesRepository.deleteById(publisher);
        List<AuthorNames> authorNamesList = new ArrayList<>();
        for (String name : names) {
            AuthorNames authorNames = new AuthorNames();
            authorNames.setPublishedName(name);
            authorNames.setAuthorId(publisher);
            authorNamesList.add(authorNames);
        }
        List<AuthorNames> savedAuthorNamesList = authorNamesRepository.saveAll(authorNamesList);
        if(!savedAuthorNamesList.isEmpty()) {
            return true;
        } else {
            return  false;
        }
    }

//    Below method is also doing the same, as above just keeping it for precautionary measures
    public boolean saveAuthorNamesFromDOI(String[] names, Long publisherID){
        authorNamesRepository.deleteById(publisherService.getPublisher(publisherID));
        List<AuthorNames> authorNamesList = new ArrayList<>();
        for (String name : names) {
            AuthorNames authorNames = new AuthorNames();
            authorNames.setPublishedName(name);
            authorNames.setAuthorId(publisherService.getPublisher(publisherID));
            authorNamesList.add(authorNames);
        }
        List<AuthorNames> savedAuthorNamesList = authorNamesRepository.saveAll(authorNamesList);
        if(!savedAuthorNamesList.isEmpty()) {
            return true;
        } else {
            return  false;
        }
    }


}
