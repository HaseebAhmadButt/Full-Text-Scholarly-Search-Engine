package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Affiliations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AffiliationRepository extends JpaRepository<Affiliations,Long> {
    Affiliations findByName(String affiliationName);
}
