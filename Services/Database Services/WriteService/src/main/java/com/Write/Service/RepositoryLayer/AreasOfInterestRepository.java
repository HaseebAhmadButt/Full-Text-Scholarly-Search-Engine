package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AreasOfInterests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreasOfInterestRepository extends JpaRepository<AreasOfInterests, Publisher> {
}
