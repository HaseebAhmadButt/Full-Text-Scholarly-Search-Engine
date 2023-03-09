package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
