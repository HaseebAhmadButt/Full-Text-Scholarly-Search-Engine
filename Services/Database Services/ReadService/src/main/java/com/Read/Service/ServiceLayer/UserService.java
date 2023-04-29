package com.Read.Service.ServiceLayer;


import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Read.Service.RepositoryLayer.PublisherRepository;
import com.Read.Service.RepositoryLayer.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public HashMap<String, Object> getUser(String email, String Password){
        User user = userRepository.findByEmail(email);
        if(user == null) return null;
        if(user.getPassword().equals(Password)){
            HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("id",user.getId());
            hashMap.put("email",user.getEmail());
            hashMap.put("name",user.getName());
            hashMap.put("picture",user.getPicture());
            hashMap.put("admin",user.isAdmin());
            Publisher publisher = publisherRepository.getPublisherThroughUserID(user.getId());
            if(publisher != null) {
                hashMap.put("publisher", true);
                boolean flag = false;
                if(publisher.getPublisherStatus().equals("ACTIVE")) flag = true;
                hashMap.put("publisherStatus", flag);
            }
            else {
                hashMap.put("publisher", false);
                hashMap.put("publisherStatus", true);
            }
            return hashMap;
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
//        System.out.println("user = " + user);
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