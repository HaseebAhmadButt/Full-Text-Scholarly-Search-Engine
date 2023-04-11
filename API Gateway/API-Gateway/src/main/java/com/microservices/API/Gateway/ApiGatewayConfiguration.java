package com.microservices.API.Gateway;

import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.Buildable;
import org.springframework.cloud.gateway.route.builder.PredicateSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Function;

@Configuration
public class ApiGatewayConfiguration {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){
//        Function<PredicateSpec, Buildable<Route>> routeFunction = p->p.path("/get").uri("http://httpbin.org:80/");
        return builder.routes().
//                        Below Header and Parameter are added to the request
        route(p->p.path("/get").filters(f->f.addRequestHeader("MyHeader", "MyURI").addRequestParameter("Param", "MyValue")).uri("http://httpbin.org:80/"))

//                Attaching another route to the same RouteBuilder
//                Below route will route the request to currency-exchange-service instance running on port 8000
//                'lb' in the below uri is used to LOAD BALANCE between multiple instances of currency-exchange-service
//                retrieved from Eureka Naming Server.
//                According to the below route, the request will be routed to the currency-exchange-service instance
//                running on port 8000 or 8001 or 8002 or any other port registered with Eureka Naming Server.

        .route(p->p.path("/currency-exchange/**").uri("lb://CURRENCY-EXCHANGE-SERVICE"))
        .route(p->p.path("/currency-conversion/**").uri("lb://CURRENCY-CONVERSION-SERVICE"))
        .route(p->p.path("/currency-conversion-feign/**").uri("lb://CURRENCY-CONVERSION-SERVICE"))
        .build();
    }
}
