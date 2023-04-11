/*
If we want to apply a filter to all the routes, we can use the global filter.
We can create a class and implement the GlobalFilter interface.
This interface has only one method called filter.
This method takes two parameters, first one is the exchange, second one is the gateway filter chain.

The exchange is the current HTTP request and response being handled by the gateway.
The gateway filter chain is the chain of filters that will be executed for this request.

See ApiGateWayGlobalConfigurations.java for more details.
 */