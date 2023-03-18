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
    @PostMapping("/createAccount/{email}/{password}")
    public User createAccount(
            @PathVariable("email") String email,
            @PathVariable("password") String password
            ){

        return userService.saveUser(new User(email, password, null, false));
    }

    // To Create Admin Account
    @PostMapping("/createAdminAccount")
    public RedirectView createAdmin(@RequestBody User user, HttpServletRequest request){
        userService.saveUser(user);
        if(user.isAdmin())
        {
            adminService.saveAdmin(user);
            request.setAttribute("adminUser", user);
            return new RedirectView("/saveAdmin");
        }
        else{
            return null;
        }
    }




//    @PostMapping("/publisher")

}
