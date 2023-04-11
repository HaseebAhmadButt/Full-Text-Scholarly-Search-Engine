package com.Write.Service.ServiceLayer;

import com.JPA.Entities.Beans.Admin;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.User;
import com.Write.Service.RepositoryLayer.AdminRepository;
import com.Write.Service.RepositoryLayer.BlockedAuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private AddedArticlesService addedarticlesService;

    @Autowired
    private BlockedAuthorService blockedAuthorService;

    @Autowired
    private ArticlesService articlesService;

    @Autowired
    private DeletedArticlesService deletedArticlesService;

    public Admin saveAdmin(User userID){
        Admin admin = new Admin(userID);
        return adminRepository.save(admin);
    }

//    To block publishers/authors
    public void blockAuthors(Long AuthorID, Long AdminID){
        Admin admin = adminRepository.findById(AdminID).get();
        Publisher publisher = publisherService.getPublisher(AuthorID);
        publisher.setPublisherStatus("BLOCKED");
        publisherService.savePublisher(publisher.getPublisherName(), publisher.getPublisherID());
        blockedAuthorService.setBlockedAuthorsRepository(publisher,admin);
    }

    public void removeBlockAuthor(Long AuthorID){
        Publisher publisher = publisherService.getPublisher(AuthorID);
        publisher.setPublisherStatus("ACTIVE");
        publisherService.savePublisher(publisher.getPublisherName(), publisher.getPublisherID());
        blockedAuthorService.removeBlockedAuthors(publisher);
    }

//    On the Admin Control side. Under the "Update Articles" heading, whenever a user uploads a new article
//    it will be stored with the status of "In-Progress" and when admin chnages its status to
//    "Accepted", it will move to added articles and if it changes the status to "Rejected".
//    It will move to Deleted Articles.
//    There is need for adding new field with title "Added Articles", which will only contain those articles
//    which have been accepted before.
//    So, here is the structure of subheadings of "Update Articles"
//    1. Add Articles ==> Articles which are uploaded by the authors but are not noted by the admin means they have "In-Progress" status
//    2. Added Articles ==> Articles which are accepted by the admin
//    3. Deleted Articles => Articles which are rejected by the admin
    public void addedArticles(String DOI, Long AdminID){
        Admin admin = adminRepository.findById(AdminID).get();
        Articles article = articlesService.getArticleByID(DOI);
        addedarticlesService.addArticles(admin,article);
        deletedArticlesService.removeArticlesFromRejected(DOI, AdminID);
        articlesService.UpdatePaperStatus(DOI, "ACCEPTED");
    }

    public void rejectedArticles(String DOI, Long AdminID, String reason){
        Admin admin = adminRepository.findById(AdminID).get();
        Articles article = articlesService.getArticleByID(DOI);
        deletedArticlesService.rejectArticles(admin,article,reason);
        addedarticlesService.removeArticlesFromAdded(article,admin);
        articlesService.UpdatePaperStatus(DOI, "REJECTED");
    }











}
