package com.Write.Service.ControllerLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.User;
import com.Write.Service.RepositoryLayer.AdminRepository;
import com.Write.Service.ServiceLayer.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/saveAdmin")
    public String saveAdmin(HttpServletRequest request){
        User adminUser = (User) request.getAttribute("adminUser");
        adminService.saveAdmin(adminUser);
        return "Admin Saved";
    }
}
