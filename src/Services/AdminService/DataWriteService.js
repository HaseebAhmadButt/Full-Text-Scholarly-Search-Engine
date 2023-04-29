import {
    ApiGatewayURL,
    post,
    httpStatusInternalServerError,
    requestHeaders,
    serviceSQLWriting
} from "../apiConstants";

export async function blockAuthor(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/blockPublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}
export async function removeBlockAuthor(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/activePublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}
export async function AcceptUploadedArticle(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/addArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}
export async function  RejectUploadedArticle(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/rejectArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}