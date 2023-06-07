package com.Write.Service.ControllerLayer;


import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.AdminService;
import com.Write.Service.ServiceLayer.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
//@CrossOrigin("http://localhost:3000")
public class UserController {
        /*
              Find User_Test.http file in "test" folder to see these URIs working
        */
    @Autowired
    private UserService userService;
    @Lazy
    @Autowired
    private AdminService adminService;

    // To Save Complete user, if all fields are available, then use this URI
    @PostMapping("/upDateUser")
    public ResponseEntity<Object> saveUser(@Valid @RequestBody User user) {
        User user1 =  userService.saveUser(user);
        return getObjectResponseEntity(user1);
    }

    @NotNull
    private ResponseEntity<Object> getObjectResponseEntity(User user1) {
        if(user1 == null) {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", "E-Mail Already Exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
        } else {
            return ResponseEntity.ok(user1);
        }
    }

    // This is for creating the user account when Signing Up.
    @PostMapping("/createAccount")
    public ResponseEntity<Object> createAccount(@RequestBody Map<String, Object> requestBody) {
        User user1 =  userService.saveUser(new User((String) requestBody.get("Email"), (String) requestBody.get("Password"), null, false, (String) requestBody.get("Name")));
        System.out.println("user1 = " + user1);
        return getObjectResponseEntity(user1);
    }


    @PutMapping("/changePassword")
    public ResponseEntity<Object> updateUserPassword(@RequestBody Map<String, String> requestBody) {
        User user = userService.updateUserPassword(requestBody.get("Email"), requestBody.get("Password"));
        if(user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }



    @PutMapping("/changeEmail")
    public ResponseEntity<Object> updateUserEmail(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserEmail(
                Long.valueOf((Integer) requestBody.get("ID")),
                (String) requestBody.get("Email")
        );
        if(status.equals("OK")){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/changePicture")
    public ResponseEntity<Object> updateUserImage(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserPicture(
                Long.valueOf((Integer) requestBody.get("ID")),
                (String) requestBody.get("Picture")
        );
        if(status.equals("OK")){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/changeName")
    public ResponseEntity<Object> updateUserName(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateUserName(Long.valueOf((Integer) requestBody.get("ID")), (String) requestBody.get("Name"));
        if(status.equals("OK")){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
//        HashMap<String, String> map = new HashMap<>();
//        map.put("Status", status);
//        return map;
    }

    @PutMapping("/changeAdminFields")
    public Map<String, String> updateAdminFields(@RequestBody Map<String, Object> requestBody) {
        String status = userService.updateAdminFields(Long.valueOf((Integer) requestBody.get("ID")), (String) requestBody.get("Name"), (String) requestBody.get("Password"));
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", status);
        return map;
    }

    @PutMapping("/changeAccount")
    public Map<String, String> updateUserAccount(@RequestBody User requestBody) {
        System.out.println("requestBody = " + requestBody);

        String status = userService.updateUserAccount(requestBody);
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", status);
        return map;
    }

    @PostMapping("/api/contact")
    public ResponseEntity<String> processContactForm(@RequestBody Map<String, String> formData) {
        // Process the form data here
        // ...

        return ResponseEntity.ok("Form submitted successfully.");
    }

}
