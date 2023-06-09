/**
 * Regular expression for email verification.
 */
export const EmailVarificationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

/**
 * HTTP method for making a POST request.
 */
export const post = "POST"

/**
 * HTTP method for making a PUT request.
 */
export const put = "PUT"

/**
 * HTTP method for making a GET request.
 */
export const httpGet = "GET"

/**
 * HTTP method for making a DELETE request.
 */
export const httpDelete = "DELETE"

/**
 * Request headers for JSON content type and JSON response acceptance.
 */
export const requestHeaders = {"Content-Type":"application/json", "Accept": "application/json"}

/**
 * Base URL for the API Gateway.
 */
export const ApiGatewayURL = "http://localhost:8765"
// export const ApiGatewayURL = "http://13.50.235.8:8765"

/**
 * Service name for reading from SQL database in the KnowledgeVerse system.
 */
export const serviceSQLReading = "KNOWLEDGEVERSE-MYSQL-READING-ENTITY"

/**
 * Service name for reading from the graph database in the KnowledgeVerse system.
 */
export const serviceGraphReading = "GRAPH-READ-SERVICE"

/**
 * Service name for reading from the Solr database in the KnowledgeVerse system.
 */
export const serviceSolrReading = "SOLR-READ-SERVICE"

/**
 * Service name for writing to SQL database in the KnowledgeVerse system.
 */
export const serviceSQLWriting = "KNOWLEDGEVERSE-MYSQL-WRITING-ENTITY"

/**
 * HTTP status code for a successful response.
 */
export const httpStatusOk = 200;

/**
 * HTTP status code for a resource successfully created.
 */
export const httpStatusCreated = 201;

/**
 * HTTP status code for a request accepted for processing.
 */
export const httpStatusAccepted = 202;

/**
 * HTTP status code for a successful response with no content.
 */
export const httpStatusNoContent = 204;

/**
 * HTTP status code for a bad request.
 */
export const httpStatusBadRequest = 400;

/**
 * HTTP status code for an unauthorized request.
 */
export const httpStatusUnauthorized = 401;

/**
 * HTTP status code for a forbidden request.
 */
export const httpStatusForbidden = 403;

/**
 * HTTP status code for a resource not found.
 */
export const httpStatusNotFound = 404;

/**
 * HTTP status code for a method not allowed.
 */
export const httpStatusMethodNotAllowed = 405;

/**
 * HTTP status code for a conflict in the request.
 */
export const httpStatusConflict = 409;

/**
 * HTTP status code for an internal server error.
 */
export const httpStatusInternalServerError = 500;

/**
 * HTTP status code for a bad gateway.
 */
export const httpStatusBadGateway = 502;

/**
 * HTTP status code for a service unavailable.
 */
export const httpStatusServiceUnavailable = 503;

/**
 * HTTP status code for a gateway timeout.
 */
export const httpStatusGatewayTimeout = 504;
