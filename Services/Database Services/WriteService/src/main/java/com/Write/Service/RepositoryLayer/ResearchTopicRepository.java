package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.ResearchTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchTopicRepository extends JpaRepository<ResearchTopic, Long> {

//    Error in this Method
    ResearchTopic findByResearchTopic(String topic);
}
