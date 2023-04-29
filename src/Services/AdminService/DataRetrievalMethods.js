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
export async function getAllAcceptedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedAcceptedArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAllAcceptedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedAcceptedArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAllAddedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAllAddedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAllAddedRejectedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllUploadRejectedArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getAllAddedRejectedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedRejectedArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getStats(){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getStats`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

export async function downloadPDF(pdfAddress){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/downloadPDF?pdfAddress=${pdfAddress}`, {
        method: httpGet,
        headers:{"Content-Type":"application/json", "Accept": "application/pdf"},
        // mode: 'cors',
        credentials: 'include'
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.blob();
}