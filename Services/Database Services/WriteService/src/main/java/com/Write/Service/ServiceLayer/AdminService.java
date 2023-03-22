package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.User;
import com.Write.Service.RepositoryLayer.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    public Admin saveAdmin(User userID){
        Admin admin = new Admin(userID);
        return adminRepository.save(admin);
    }



}
