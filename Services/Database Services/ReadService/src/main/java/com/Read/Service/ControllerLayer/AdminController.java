package com.Read.Service.ControllerLayer;
import com.Read.Service.ServiceLayer.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;
    @GetMapping("/getStats")
    public HashMap<String, List<Object[]>> getStats(){
        return adminService.getStats();
    }
}
