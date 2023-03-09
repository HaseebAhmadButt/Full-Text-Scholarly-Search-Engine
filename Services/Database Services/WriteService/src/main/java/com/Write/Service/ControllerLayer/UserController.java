package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.GetExchange;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/user")
    public User saveUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

//    @PostMapping("/publisher")

}
