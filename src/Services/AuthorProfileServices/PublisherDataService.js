import {ApiGatewayURL, serviceSQLReading, requestHeaders, post,httpGet, httpStatusNotFound} from "../apiConstants"
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

