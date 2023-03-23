package com.Write.Service.ServiceLayer;


import com.JPA.Entities.Beans.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Write.Service.RepositoryLayer.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public String updateUserPassword(Long ID, String Password){
        Optional<User> optionalUser = userRepository.findById(ID);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setPassword(Password);
            userRepository.save(user);
            return "OK";
        }
        return "FAILED";
    }

    public String updateUserEmail(Long ID, String Email){
        Optional<User> optionalUser = userRepository.findById(ID);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setEmail(Email);
            userRepository.save(user);
            return "OK";
        }
        return "FAILED";
    }

    public String updateUserName(Long ID, String Name){
        Optional<User> optionalUser = userRepository.findById(ID);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setName(Name);
            userRepository.save(user);
            return "OK";
        }
        return "FAILED";
    }

    public String updateAdminFields(Long ID, String Name, String Password){
        Optional<User> optionalUser = userRepository.findById(ID);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setName(Name);
            user.setPassword(Password);
            userRepository.save(user);
            return "OK";
        }
        return "FAILED";
    }

    public String updateUserAccount(Long ID, User user){
        Optional<User> optionalUser = userRepository.findById(ID);
        if(optionalUser.isPresent()){
            User userFound = optionalUser.get();
            userFound.setEmail(user.getEmail());
            userFound.setPassword(user.getPassword());
            userFound.setName(user.getName());
            userFound.setPicture("");
            userRepository.save(user);
            return "OK";
        }
        return "FAILED";
    }

    public User getUser(Long ID) {
        return userRepository.findById(ID).get();
    }


}
