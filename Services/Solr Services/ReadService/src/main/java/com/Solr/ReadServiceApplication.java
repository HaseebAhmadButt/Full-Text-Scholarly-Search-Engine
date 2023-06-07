package com.Solr;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.Http2SolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@SpringBootApplication
public class ReadServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(ReadServiceApplication.class, args);
	}
//	@Value("${solr.host}")
//	private String solrHost;
//	@Bean
//	public SolrClient solrClient() {
//		return new Http2SolrClient.Builder(solrHost).build();
//	}
}
//}
@Configuration
class ServiceConfigurations{
	@Bean
	public FilterRegistrationBean<CorsFilter> coresFilters(){
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOriginPattern("http://localhost:3000");
		configuration.addAllowedHeader("Content-Type");
		configuration.addAllowedHeader("Accept");
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS"));
		configuration.setMaxAge(3600L);
		source.registerCorsConfiguration("/**", configuration);
		return new FilterRegistrationBean<>(new CorsFilter(source));
	}
}