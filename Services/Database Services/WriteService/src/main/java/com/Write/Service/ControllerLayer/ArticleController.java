package com.Write.Service.ControllerLayer;

import com.Write.Service.ServiceLayer.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArticleController {

    @Autowired
    private ArticlesService articlesService;
}
