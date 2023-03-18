package com.solr.Entities.Temp.repository;

//import com.solr.Entities.Temp.model.Employee;
import com.solr.Entities.Temp.model.Paper;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PaperRepository extends SolrCrudRepository<Paper, String> {

	List<Paper> findByTitleContainingOrAbstractContaining(String title, String abstractText);

}
