package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.AdminService;
import com.Write.Service.ServiceLayer.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;

    // To Save Complete user, if all fields are available, then use this URI
    @PostMapping("/saveUser")
    public User saveUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    // This is for creating the user account when Signing Up.
    @PostMapping("/createAccount")
    public User createAccount(@RequestBody Map<String, Object> requestBody) {
        return userService.saveUser(new User((String) requestBody.get("Email"), (String) requestBody.get("Password"), null, false));
    }

    // To Create Admin Account
    //    @PostMapping("/createAdminAccount")
//    public RedirectView createAdmin(@RequestBody User user, HttpServletRequest request){
//        userService.saveUser(user);
//        if(user.isAdmin())
//        {
//            adminService.saveAdmin(user);
//            request.setAttribute("adminUser", user);
//            return new RedirectView("/saveAdmin");
//        }
//        else{
//            return null;
//        }
//    }

    @PutMapping("/changePassword")
    public Map<String, String> updateUserPassword(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserPassword(Long.valueOf((Integer) requestBody.get("ID")), (String) requestBody.get("Password"));
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", status);
        return map;
    }

    @PutMapping("/changeEmail")
    public Map<String, String> updateUserEmail(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserEmail(
                Long.valueOf((Integer) requestBody.get("ID")),
                (String) requestBody.get("Email")
        );
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", status);
        return map;
    }

    @PutMapping("/changeAccount")
    public Map<String, String> updateUserAccount(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserAccount(
                Long.valueOf((Integer) requestBody.get("ID")),
                (String) requestBody.get("Email"),
                (String) requestBody.get("Password")
        );
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", status);
        return map;
    }


//    @PostMapping("/publisher")

}
