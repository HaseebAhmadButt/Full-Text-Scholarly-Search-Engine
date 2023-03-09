package com.Read.Service.ControllerLayer;

import com.JPA.Entities.Beans.User;
import com.Read.Service.Beans.LogIn;
import com.Read.Service.ServiceLayer.AdminService;
import com.Read.Service.ServiceLayer.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LogInController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody LogIn logIn) {
        return userService.findUser(logIn.getEmail(), logIn.getPassword());
    }

}
