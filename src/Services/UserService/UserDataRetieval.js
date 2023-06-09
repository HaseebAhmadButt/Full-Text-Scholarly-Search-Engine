import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError, serviceGraphReading, serviceSolrReading
} from "../apiConstants"
/**
 * Function: getArticle
 * Description: Sends a request to retrieve an article by its DOI.
 * @param {string} DOI - The DOI (Digital Object Identifier) of the article.
 * @returns {Promise} - A promise that resolves to the response JSON or an error status code.
 */
export async function getArticle(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleByDOI?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getRelatedArticles
 * Description: Sends a request to retrieve related articles based on the provided body.
 * @param {object} body - The request body containing the necessary data for retrieving related articles.
 * @returns {Promise} - A promise that resolves to the response JSON or an error status code.
 */

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