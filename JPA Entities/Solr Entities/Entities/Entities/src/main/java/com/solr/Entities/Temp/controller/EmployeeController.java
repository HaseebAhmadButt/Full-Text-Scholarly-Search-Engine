package com.solr.Entities.Temp.controller;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.*;

import com.solr.Entities.Temp.model.Paper;
import com.solr.Entities.Temp.repository.PaperRepository;
//import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//import com.javatechie.solar.api.model.Employee;
//import com.javatechie.solar.api.repository.EmployeeRepository;

@RestController
public class EmployeeController {

	@Autowired
	private PaperRepository repository;

	@PostConstruct
	public void addEmployees() {
		List<Paper> employees = new ArrayList<>();
		employees.add(new Paper("373", "Basant","BTM"));
		employees.add(new Paper("908", "Santosh", "XYZ" ));
		employees.add(new Paper("321", "Sagar","PQR" ));
		repository.saveAll(employees, Duration.ofSeconds(10));
	}

	@GetMapping("/getALL")
	public Iterable<Paper> getEmployees() {
		return repository.findAll(Sort.by("id"));
	}

//	@GetMapping("/getEmployee/{name}")
//	public Paper getEmployeeByName(@PathVariable String name) {
//		return repository.findByName(name);
//	}

}
