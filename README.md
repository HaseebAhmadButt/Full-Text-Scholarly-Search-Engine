# kNowledgeVerse Back-End

This branch contains all of the code related to back-end of the application. Backend of the application is developed using Java Spring Framework's sub module, Spring Boot and Spring Cloud.
Spring Boot is being used for developing the backend web server, which is responsible for handling requests and then processing the requests. All of these servers are running as Service and Spring Cloud is being used to redirect request to appropriate service. 

## Folder Structure
All of the services are placed inside the `Services` folder. 
API Gateway is placed inside the `API Gateway` folder.
All of the Entities are placed inside the `JPA Entities` folder.
Naming Server which registers all of the services is placed inside the `Naming Server` folder.
