package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.JPA.Entities.CompositBeans.BlockedAuthors;
import com.Write.Service.RepositoryLayer.BlockedAuthorsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlockedAuthorService {

    @Autowired
    private BlockedAuthorsRepository blockedAuthorsRepository;

    public void setBlockedAuthorsRepository(Publisher publisher, User user){
        blockedAuthorsRepository.save(new BlockedAuthors(publisher, user));
    }

    @Transactional
    public void removeBlockedAuthors(Publisher publisher){
        blockedAuthorsRepository.deleteByAuthorId(publisher.getPublisherID());
    }
}
