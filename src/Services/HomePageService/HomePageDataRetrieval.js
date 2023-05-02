import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError, serviceGraphReading
} from "../apiConstants"
export async function getTopics(){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getTopics`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getRecentArticles(){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getRecentArticles`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getTopCitedArticles(){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getTopCitedArticles`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}