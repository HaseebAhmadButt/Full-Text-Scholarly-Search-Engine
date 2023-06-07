package com.Service.Graph_Read.Controller;

import com.JPA.Entities.Neo.Paper.PaperEntity;
import com.Service.Graph_Read.Repositories.PaperRepository;
import com.Service.Graph_Read.ServicesLayer.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ControllerLayer {


/*
Here are they updated queries to apply PageRank algorithm:

For Calculating the Graph:
CALL gds.graph.project(
  'myGraph',
  'Article',
  {
    orientation:'Cites'
  }
)

For Calculating the Score of Each Node:
call gds.articleRank.stream('myGraph') YIELD nodeId, score

For Calculating and storing the articleRankScore under the field Name: "articleRankScore":
CALL gds.articleRank.write('myGraph', {
  writeProperty: 'articleRank'
})
YIELD nodePropertiesWritten, ranIterations

For Deleting the Graph:
CALL gds.graph.drop('myGraph')




Finding Score of each Node along with their Names:
call gds.articleRank.stream('myGraph') YIELD nodeId, score Return gds.util.asNode(nodeId).PaperID as PaperID, score ORDER BY score DESC, PaperID ASC

 */
    @Autowired
    private ServiceLayer serviceLayer;
    @Autowired
    private PaperRepository paperRepository;

//    To get all papers citing a specific paper
    @GetMapping("/papers/citing")
    public List<Object> findPapersThatCitePaper(@RequestParam String paperId) {
        return serviceLayer.findPapersThatCitePaper(paperId);
    }
//    @GetMapping("/papers/citing/ID")
//    public List<List<String>> findPaperIDsThatCitePaper(@RequestParam String paperId) {
//        return serviceLayer.findIDThatCitePaper(paperId);
//    }

//    To get all papers that a specific paper has cited

    @GetMapping("/papers/cited/ID")
    public List<PaperEntity> findPapersThisPaperCited(@RequestParam String paperId) {
        return serviceLayer.findPapersThisPaperCited(paperId);
    }

    @PostMapping("/getPaperCentrality")
    public List<Map<String, Object>> getCentrality(@RequestBody List<String> stringList){
        List<Map<String, Object>> maps = paperRepository.getArticleCentrality(stringList);
        return maps;
    }
}
