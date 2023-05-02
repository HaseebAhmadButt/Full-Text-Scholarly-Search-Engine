export const EmailVarificationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const post = "POST"
export const put = "PUT"
export const httpGet = "GET"
export const httpDelete = "DELETE"
export const requestHeaders = {"Content-Type":"application/json", "Accept": "application/json"}
export const ApiGatewayURL = "http://localhost:8765"
export const serviceSQLReading = "KNOWLEDGEVERSE-MYSQL-READING-ENTITY"
export const serviceGraphReading = "GRAPH-READ-SERVICE"
export const serviceSQLWriting = "KNOWLEDGEVERSE-MYSQL-WRITING-ENTITY"

export const httpStatusOk = 200;
export const httpStatusCreated = 201;
export const httpStatusAccepted = 202;
export const httpStatusNoContent = 204;
export const httpStatusBadRequest = 400;
export const httpStatusUnauthorized = 401;
export const httpStatusForbidden = 403;
export const httpStatusNotFound = 404;
export const httpStatusMethodNotAllowed = 405;
export const httpStatusConflict = 409;
export const httpStatusInternalServerError = 500;
export const httpStatusBadGateway = 502;
export const httpStatusServiceUnavailable = 503;
export const httpStatusGatewayTimeout = 504;
