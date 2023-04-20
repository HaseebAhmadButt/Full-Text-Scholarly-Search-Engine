//package com.microservices.API.Gateway;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.cloud.gateway.filter.GatewayFilterChain;
//import org.springframework.cloud.gateway.filter.GlobalFilter;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//public class ApiGateWayGlobalConfigurations implements GlobalFilter {
//
//    /*
//    The method signature includes two parameters: exchange and chain.
//    The ServerWebExchange object represents the current HTTP request and response being handled by the gateway.
//    The GatewayFilterChain object represents the chain of filters that will be executed for this request.
//     */
//
//    /*
//    The method returns a Mono<Void> object, which is a reactive type used in Spring. A Mono is a publisher that can
//    emit zero or one item, and Void is the type of the item emitted by this particular Mono.
//    In this case, the method returns null, which means that it does not emit any items and immediately completes.
//     */
//
//    /*
//    However, in a real implementation, this method would typically contain logic to modify the request or response,
//    and then call the filter method on the chain object to continue the chain of filters. This is necessary to ensure
//    that all the filters in the chain are executed and the final response is returned to the client.
//     */
//    private Logger logger = LoggerFactory.getLogger(this.getClass());
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        logger.info("Path of the request received -> {}", exchange.getRequest().getPath());
//        return chain.filter(exchange);
//    }
//}
