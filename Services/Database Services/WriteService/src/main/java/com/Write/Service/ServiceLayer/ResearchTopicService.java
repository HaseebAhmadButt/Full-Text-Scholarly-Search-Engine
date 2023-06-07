package com.Write.Service.ServiceLayer;

//import com.JPA.Entities.Beans.Affiliations;
import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.Beans.ResearchTopic;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import com.Write.Service.RepositoryLayer.ResearchTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResearchTopicService {

    @Autowired
    private ResearchTopicRepository researchTopicRepository;

    public ResearchTopic FindOrCreateTopic(String topic){
        ResearchTopic researchTopic = researchTopicRepository.findByResearchTopicContains(getTopicName(topic.trim()));
        if (researchTopic == null) {
            researchTopic = new ResearchTopic();
            researchTopic.setResearchTopic(topic);
            researchTopicRepository.save(researchTopic);
        }
        return researchTopic;
    }
    private String getTopicName(String name){
        return name
                .toLowerCase()
                .replaceAll(" ", "_")
                .replaceAll("[^a-zA-Z0-9\\\\s]", "");
    }

}
