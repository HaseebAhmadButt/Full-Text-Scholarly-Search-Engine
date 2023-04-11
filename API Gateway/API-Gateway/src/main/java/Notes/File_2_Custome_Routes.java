/*
Custom Routes, the procedure described in "Properties" file is for allowing the Spring Cloud to
automatically create the routes for us. But, if we want to create the routes manually, we can do
this, for that we need to create a "configuration class", like we described in Spring Core Notes.

        ==>"ApiGatewayConfiguration.java"
                        is created for this purpose.

            Visit Configurations File for more details.

In Spring Cloud Gateway, RouteLocator is an interface that defines a way to locate and build routes
for incoming requests. It is used to configure the routing rules of the API Gateway and to define how
requests should be forwarded to the appropriate backend services.
RouteLocator is typically implemented as a Spring bean that defines one or more routes by calling the
RouteLocatorBuilder API. The RouteLocatorBuilder is a builder pattern API that provides a fluent way to
define routes using a variety of criteria, such as path, query parameters, headers, and methods.


 */