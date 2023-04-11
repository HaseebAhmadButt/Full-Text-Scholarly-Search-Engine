package com.Read.Service.ServiceLayer;


import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Read.Service.RepositoryLayer.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUser(String email, String Password){
        User user = userRepository.findByEmail(email);
//        System.out.println("user = " + user);
        HashMap<String, Object> hashMap = new HashMap<>();
        if(user.getPassword().equals(Password)){
            user.setPassword(null);
//            System.out.println("Passwords Matched");
//            hashMap.put("userData", user);
//            if(user.isAdmin()) return hashMap;
//
//            Publisher publisher = userRepository.findAssociatedPublisher(user.getId());
//            if(publisher==null) return hashMap;
//            if(publisher.getPublisherStatus().equals("BLOCKED"))
//            {
//                hashMap.put("publisherData", "Blocked");
//                return hashMap;
//            }
//            hashMap.put("publisherData", publisher);
//            List<String> authorNames = userRepository.getAuthorNames(publisher.getPublisherID());
//            List<String> authorInterests = userRepository.getAuthorInterests(publisher.getPublisherID());
//            hashMap.put("publisherNames", authorNames);
//            hashMap.put("authorInterests", authorInterests);
            return user;
        }
        return null;
    }

    public User getUserByID(Long ID){
        if(userRepository.findById(ID).isPresent()){
            return userRepository.findById(ID).get();
        }
        return null;
    }


}
