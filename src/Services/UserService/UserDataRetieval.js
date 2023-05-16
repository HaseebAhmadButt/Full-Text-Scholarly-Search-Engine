import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError, serviceGraphReading, serviceSolrReading
} from "../apiConstants"
export async function getArticle(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleByDOI?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}
export async function getRelatedArticles(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSolrReading}/retrieveRelatedArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}