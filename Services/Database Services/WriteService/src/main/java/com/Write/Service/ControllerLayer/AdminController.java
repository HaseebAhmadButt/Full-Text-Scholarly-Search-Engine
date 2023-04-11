package com.Write.Service.ControllerLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.User;
import com.Write.Service.ServiceLayer.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    /*
    This method receives userObject which is set with the field of Admin to be true
     */
    @PostMapping("/saveAdmin")
    public ResponseEntity<Admin> saveAdmin(@RequestBody User user){
        System.out.println("user = " + user);
        if(!user.isAdmin()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(adminService.saveAdmin(user));
    }

    @PostMapping("/blockPublisher")
    public  void rejectPublisher(@RequestBody Map<String, Object> stringObjectMap){
        adminService.blockAuthors(Long.valueOf((Integer) stringObjectMap.get("publisherID")), Long.valueOf((Integer) stringObjectMap.get("adminID")) );
    }


    @PostMapping("/activePublisher")
    public void activePublisher(@RequestBody Map<String, Object> stringObjectMap){
        adminService.removeBlockAuthor(Long.valueOf((Integer) stringObjectMap.get("publisherID")));
    }

    @PostMapping("/addArticles")
    public void approveArticles(@RequestBody Map<String, Object> stringObjectMap){
        adminService.addedArticles((String) stringObjectMap.get("DOI"), Long.valueOf((Integer) stringObjectMap.get("adminID")));
    }

    @PostMapping("/rejectArticles")
    public void rejectArticles(@RequestBody Map<String, Object> stringObjectMap){
        adminService.rejectedArticles((String) stringObjectMap.get("DOI"), Long.valueOf((Integer) stringObjectMap.get("adminID")), (String)  stringObjectMap.get("Reason"));
    }
}
