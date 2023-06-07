package com.Write.Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.support.*;

import java.util.Arrays;
@EnableJpaRepositories
@EntityScan(basePackages = "com.JPA.Entities")
@SpringBootApplication
@ComponentScan({"com.Write.Service.ServiceLayer", "com.Write.Service.RepositoryLayer", "com.Write.Service.ControllerLayer"})
public class WriteServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WriteServiceApplication.class, args);
	}

}

@Configuration
class ServiceConfigurations{
	@Bean
	public FilterRegistrationBean<CorsFilter> coresFilters(){
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOriginPattern("*");
		configuration.addAllowedHeader("Content-Type");
		configuration.addAllowedHeader("Accept");
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS"));
		configuration.setMaxAge(3600L);
		source.registerCorsConfiguration("/**", configuration);
		return new FilterRegistrationBean<>(new CorsFilter(source));
	}
}
