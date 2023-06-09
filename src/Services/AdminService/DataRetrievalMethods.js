import {
    ApiGatewayURL,
    httpGet,
    httpStatusInternalServerError,
    requestHeaders,
    serviceSQLReading
} from "../apiConstants";


/**

Function: getAllAuthors
Description: Fetches all authors with pagination from the backend server.
@param {number} pageNo - The page number to retrieve.
@param {number} pageSize - The number of items per page.
@returns {Promise} - A promise that resolves to the JSON response containing the authors.
*/

export async function getAllAuthors(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllPublishers?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**

Function: getAuthorsWithEmail
Description: Fetches authors with pagination and a specific email from the backend server.
@param {number} pageNo - The page number to retrieve.
@param {number} pageSize - The number of items per page.
@param {string} email - The email address to filter authors.
@returns {Promise} - A promise that resolves to the JSON response containing the authors with the specified email.
*/

export async function getAuthorsWithEmail(pageNo, pageSize, email){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getPublisherWithEmail?pageNo=${pageNo}&pageSize=${pageSize}&email=${email}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}


/**

Function: getAllAcceptedArticles
Description: Fetches all accepted articles with pagination from the backend server.
@param {number} pageNo - The page number to retrieve.
@param {number} pageSize - The number of items per page.
@returns {Promise} - A promise that resolves to the JSON response containing the accepted articles.
*/


export async function getAllAcceptedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedAcceptedArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**

Function: getAllAcceptedArticlesWithQuery
Description: Fetches accepted articles with pagination and a specific query from the backend server.
@param {number} pageNo - The page number to retrieve.
@param {number} pageSize - The number of items per page.
@param {string} query - The query string to filter articles.
@returns {Promise} - A promise that resolves to the JSON response containing the accepted articles with the specified query.
*/

export async function getAllAcceptedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedAcceptedArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAllAddedArticles
 * Description: Fetches all added articles with pagination from the backend server.
 * @param {number} pageNo - The page number to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - A promise that resolves to the JSON response containing the added articles.
 */

export async function getAllAddedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAllAddedArticlesWithQuery
 * Description: Fetches added articles with pagination and a specific query from the backend server.
 * @param {number} pageNo - The page number to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @param {string} query - The query string to filter articles.
 * @returns {Promise} - A promise that resolves to the JSON response containing the added articles with the specified query.
 */

export async function getAllAddedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAllAddedRejectedArticles
 * Description: Fetches all added rejected articles with pagination from the backend server.
 * @param {number} pageNo - The page number to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise} - A promise that resolves to the JSON response containing the added rejected articles.
 */

export async function getAllAddedRejectedArticles(pageNo, pageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllUploadRejectedArticles?pageNo=${pageNo}&pageSize=${pageSize}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAllAddedRejectedArticlesWithQuery
 * Description: Fetches added rejected articles with pagination and a specific query from the backend server.
 * @param {number} pageNo - The page number to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @param {string} query - The query string to filter articles.
 * @returns {Promise} - A promise that resolves to the JSON response containing the added rejected articles with the specified query.
 */

export async function getAllAddedRejectedArticlesWithQuery(pageNo, pageSize, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAddedRejectedArticlesWithParams?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**

Function: getStats
Description: Fetches statistics from the backend server.
@returns {Promise} - A promise that resolves to the JSON response containing the statistics.
*/

export async function getStats(){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getStats`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**

Function: downloadPDF
Description: Downloads a PDF file from the backend server.
@param {string} pdfAddress - The address of the PDF file to download.
@returns {Promise} - A promise that resolves to the binary blob of the PDF file.
*/

export async function downloadPDF(pdfAddress){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/downloadPDF?pdfAddress=${pdfAddress}`, {
        method: httpGet,
        // headers:{"Content-Type":"application/json", "Accept": "application/pdf"},
        // mode: 'cors',
        credentials: 'include'
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.blob();
}