package com.Read.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Articles;
import com.JPA.Entities.CompositBeans.References;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface RefrencesRepository extends JpaRepository<References, Long> {

    @Query("SELECT ar.Paper_Title, ar.Paper_Abstract, ar.Paper_URL, COUNT(*) as Citations FROM Articles ar JOIN References pa ON ar.Paper_DOI = pa.articleI2.Paper_DOI GROUP BY pa.articleI2.Paper_DOI order by Citations desc LIMIT 10")
    List<Object[]> getTopCitedPapers();
}
