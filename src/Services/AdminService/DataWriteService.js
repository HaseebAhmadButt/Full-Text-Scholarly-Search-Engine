import {
    ApiGatewayURL,
    post,
    httpStatusInternalServerError,
    requestHeaders,
    serviceSQLWriting
} from "../apiConstants";

/**
 * Function: blockAuthor
 * Description: Sends a request to block a publisher.
 * @param {object} body - The request body containing the necessary information to block the author.
 * @returns {Promise} - A promise that resolves to the status code of the response.
 */

export async function blockAuthor(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/blockPublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: removeBlockAuthor
 * Description: Sends a request to remove the block on a publisher.
 * @param {object} body - The request body containing the necessary information to remove the block on the author.
 * @returns {Promise} - A promise that resolves to the status code of the response.
 */

export async function removeBlockAuthor(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/activePublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: AcceptUploadedArticle
 * Description: Sends a request to add an uploaded article to the system.
 * @param {object} body - The request body containing the necessary information of the uploaded article.
 * @returns {Promise} - A promise that resolves to the status code of the response.
 */

export async function AcceptUploadedArticle(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/addArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: RejectUploadedArticle
 * Description: Sends a request to reject an uploaded article.
 * @param {object} body - The request body containing the necessary information of the article to be rejected.
 * @returns {Promise} - A promise that resolves to the status code of the response.
 */

export async function  RejectUploadedArticle(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/rejectArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: RejectSingleArticle
 * Description: Sends a request to reject a single article.
 * @param {object} body - The request body containing the necessary information of the article to be rejected.
 * @returns {Promise} - A promise that resolves to the status code of the response.
 */

export async function  RejectSingleArticle(body){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/rejectSingleArticle`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(body)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}