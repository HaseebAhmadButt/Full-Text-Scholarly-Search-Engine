package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.BlockedAuthors;
import com.Write.Service.RepositoryLayer.BlockedAuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlockedAuthorService {

    @Autowired
    private BlockedAuthorsRepository blockedAuthorsRepository;

    public void setBlockedAuthorsRepository(Publisher publisher, Admin admin){
        blockedAuthorsRepository.save(new BlockedAuthors(publisher, admin));
    }

    public void removeBlockedAuthors(Publisher publisher){
        blockedAuthorsRepository.deleteById(publisher);
    }
}
