package com.Read.Service.ServiceLayer;


import com.Read.Service.RepositoryLayer.RefrencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RefrencesServiceLayer {

    @Autowired
    private RefrencesRepository refrencesRepository;


    public List<Map<String, Object>> getTopCitedPapers() {
        List<Object[]> result = refrencesRepository.getTopCitedPapers();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : result) {
            Map<String, Object> paper = new HashMap<>();
            paper.put("paperTitle", row[0]);
            paper.put("paperAbstract", row[1]);
            paper.put("paperLink", row[2]);
            paper.put("totalCitations", row[3]);
            response.add(paper);
        }

        return response;
    }
}
