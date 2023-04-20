//package com.microservices.API.Gateway;
//
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//import java.util.Arrays;
//
//@Configuration
//public class ApiGatewayConfiguration {
//
////    @Bean
////    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){
//        return builder.routes()
//        .route(p->p.path("/createAccount").uri("lb://KNOWLEDGEVERSE-MYSQL-WRITING-ENTITY"))
//        .build();
////    }
//
//
////    @Bean
////    public FilterRegistrationBean<CorsFilter> coresFilters(){
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        CorsConfiguration configuration = new CorsConfiguration();
////        configuration.addAllowedOriginPattern("*");
////        configuration.addAllowedHeader("Content-Type");
////        configuration.addAllowedHeader("Accept");
////        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS"));
////        configuration.setMaxAge(3600L);
////        source.registerCorsConfiguration("/**", configuration);
////        return new FilterRegistrationBean<>(new CorsFilter(source));
////    }
//}



