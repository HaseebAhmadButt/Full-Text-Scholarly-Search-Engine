import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError
} from "../apiConstants"
export async function getPublisher(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getPublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

export async function getAllArticles(useID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAcceptedArticles?pageNo=${pageNo}&pageSize=${PageSize}&userID=${useID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

export async function getAllRequiredArticles(query,useID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllRequiredAcceptedArticles?pageNo=${pageNo}&pageSize=${PageSize}&userID=${useID}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

export async function getArticleTopics(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleTopics`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

export async function getAllUploadedArticlesBySpecificPublisher(publisherID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllUploadedArticlesBySpecificPublisher?pageNo=${pageNo}&pageSize=${PageSize}&publisherID=${publisherID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusInternalServerError) return httpStatusInternalServerError;
    return response.json();
}
export async function updateAddedArticles(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/saveAuthorPapers`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return "Error"
    return response.status;
}
export async function deleteAuthorPapers(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/deleteAuthorPapers`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return "Error"
    return response.status;
}
export async function saveUploadArticle(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/saveUploadArticle`, {
        method: post,
        // headers:requestHeaders,
        body: data
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}
export async function getSavedArticles(userID){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getSavedArticles?userID=${userID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

