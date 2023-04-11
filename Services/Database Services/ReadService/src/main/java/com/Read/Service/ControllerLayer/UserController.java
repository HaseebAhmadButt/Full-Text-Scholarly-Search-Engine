package com.Read.Service.ControllerLayer;

import com.JPA.Entities.Beans.User;
import com.Read.Service.ServiceLayer.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/userSignIn")
    public ResponseEntity<User> userSignIn(@RequestBody Map<String, String> userSignIn){
        User user = userService.getUser(userSignIn.get("Email"), userSignIn.get("Password"));
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getUserByID/{ID}")
    public User getUserByID(@PathVariable("ID") Long ID){
        return userService.getUserByID(ID);
    }

}
