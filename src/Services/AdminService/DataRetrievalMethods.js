import {
    ApiGatewayURL,
    httpGet,
    httpStatusInternalServerError,
    requestHeaders,
    serviceSQLReading
} from "../apiConstants";

export async function getAllAuthors(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllPublishers?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAuthorsWithEmail(pageNo, pageSize, email){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getPublisherWithEmail?pageNo=${pageNo}&pageSize=${pageSize}&email=${email}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}