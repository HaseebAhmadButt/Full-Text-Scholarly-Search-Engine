package com.Read.Service.ControllerLayer;

import com.JPA.Entities.Beans.User;
import com.Read.Service.ServiceLayer.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/userSignIn")
    public Map<String, Object> userSignIn(@RequestBody Map<String, String> userSignIn){
        return userService.getUser(userSignIn.get("Email"), userSignIn.get("Password"));
    }

    @GetMapping("/getUserByID/{ID}")
    public User getUserByID(@PathVariable("ID") Long ID){
        return userService.getUserByID(ID);
    }

}
