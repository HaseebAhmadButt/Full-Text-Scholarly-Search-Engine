package com.Write.Service.ControllerLayer;

import com.Write.Service.ServiceLayer.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin("http://localhost:3000")
public class ArticleController {

    private String Upload_DIR = "E:\\FYP\\Implementation\\Complete Implementation With Branches\\FYP\\Uploaded Files Storage Folder";
    @Autowired
    private ArticlesService articlesService;

    @PostMapping("/saveCrawledArticle")
    public String saveArticlesFromCrawler(@RequestBody Map<String, Object> stringObjectMap){
        return articlesService.savePaperCompleteFromCrawler(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
                // This is the place where model will be called to generate topics of Paper and those will be added as List<String>
                // to this Article
                //TODO: Integrate Model With this Service and Generate Topics using Articles "Title" and "Abstract"
                //TODO; Replace it with Authors List, like
//                (List<String>) stringObjectMap.get("Authors")
                (List<String>) stringObjectMap.get("Topics")
        );
    }

    @PostMapping("/saveUploadedArticle")
    public String saveArticlesFromUser(
            @RequestBody Map<String, Object> stringObjectMap
    ){
       return articlesService.savePaperCompleteFromUser(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
//                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
               // This is the place where model will be called to generate topics of Paper and those will be added as List<String>
               // to this Article
               //TODO: Replace the below parameter and only accept list of authors
//                (List<String>) stringObjectMap.get("Topics"),
                (List<String>) stringObjectMap.get("Authors")
        );
    }
    @PostMapping("/saveUploadedArticleSample")
    public String saveSampleArticlesFromUser(
            @RequestBody Map<String, Object> stringObjectMap
    ){
       return articlesService.saveSamplePaperCompleteFromUser(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Title"),
                (String) stringObjectMap.get("Abstract"),
                (String) stringObjectMap.get("Year"),
//                (String) stringObjectMap.get("Link"),
                (String) stringObjectMap.get("JournalName"),
               // This is the place where model will be called to generate topics of Paper and those will be added as List<String>
               // to this Article
               //TODO: Replace the below parameter and only accept list of authors
//                (List<String>) stringObjectMap.get("Topics"),
                (List<String>) stringObjectMap.get("Authors")
        );
    }
    @PostMapping("/saveUploadArticle")
    public String saveUploadedArticlesFromUser(
           @RequestParam("DOI") String doi,
           @RequestParam("Title") String title,
           @RequestParam("Abstract") String abstractText,
           @RequestParam("Year") String year,
           @RequestParam("JournalName") String journalName,
           @RequestParam("Authors") List<String> authors,
           @RequestParam("authorID") Long authorID,
           @RequestParam("file") MultipartFile multipartFile
    ) throws IOException {
        //First Saving File With the Name and DOI of Article
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;

        try {
            inputStream = multipartFile.getInputStream();
            byte[] buffer = new byte[inputStream.available()]; // Use a buffer to read from input stream
            int bytesRead;
            fileOutputStream = new FileOutputStream(Upload_DIR + File.separator + doi.replaceAll("/","_") +"_"+ multipartFile.getOriginalFilename());

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead); // Write the data to the output stream
            }

            fileOutputStream.flush(); // Flush the output stream to ensure all data is written
        } catch (IOException e) {
            // Handle any I/O errors that may occur
            e.printStackTrace();
        } finally {
            // Close the input and output streams
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (fileOutputStream != null) {
                    fileOutputStream.close();
                }
            } catch (IOException e) {
                // Handle any I/O errors that may occur while closing the streams
                e.printStackTrace();
            }
        }

        //  File Writing is completed.
        // Now Storing the complete information along with PDF File Name in Database

       return articlesService.savePaperCompleteFromUserUpload(
               authorID,
               doi,
               title,
               abstractText,
               year,
               Upload_DIR + File.separator + doi.replaceAll("/","_") +"_"+ multipartFile.getOriginalFilename(),
               journalName,
               authors);

    }

    @PostMapping("/UpdatePaperAbstract")
    public String updatePaperAbstract(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperAbstract(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Abstract")
        );
//        return "";
    }

    @PostMapping("/UpdatePaperYear")
    public String updatePaperYear(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperYear(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Year")
        );
//        return "";
    }

    @PostMapping("/UpdatePaperLink")
    public String updatePaperLink(
            @RequestBody Map<String, Object> stringObjectMap
    ){
        return articlesService.UpdatePaperURL(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Link")
        );
//        return "";
    }
    @PostMapping("/UpdatePaperJournal")
    public String updatePaperJournal(
            @RequestBody Map<String, Object> stringObjectMap
    ){
       return articlesService.UpdatePaperJournal(
                (String) stringObjectMap.get("DOI"),
                (String) stringObjectMap.get("Journal")
        );
//        return "";
    }




}
