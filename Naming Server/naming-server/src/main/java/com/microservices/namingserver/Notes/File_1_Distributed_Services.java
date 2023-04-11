/*
    Whenever any instance of a service is down, the client will not be able to access it.
    To solve this problem, we can have multiple instances of the same service running.
    This is called Distributed Services.

    To access available instances of a service, we can use a service registry.

    Define service registry/ Naming Server?
    A service registry is a database that contains information about all the instances of a service.
    It contains the following information:
        1. Service name
        2. Service URL
        3. Service port
        4. Service status (UP or DOWN)

    How does service registry work?
    When a service instance is started, it registers itself with the service registry.
    When a service instance is stopped, it unregisters itself from the service registry.
    When a client wants to access a service, it looks up the service registry to find the available instances of the service.

    To enable service registry, we need to add the following dependency to the pom.xml file:
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

    To enable service registry, we need to add the @EnableEurekaServer annotation to the main class.

    Then, we need to configure the service registry in the application.properties file:
        server.port=8761
        eureka.client.register-with-eureka=false
        eureka.client.fetch-registry=false

        These settings are just for current working, may be changed later.

 */