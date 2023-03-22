package com.Write.Service.RepositoryLayer;

import com.JPA.Entities.Beans.Publisher;
import com.JPA.Entities.CompositBeans.AuthorNames;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorNamesRepository extends JpaRepository<AuthorNames, Publisher> {
}
