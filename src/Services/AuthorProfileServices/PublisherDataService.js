import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError, serviceGraphReading
} from "../apiConstants"

/**
 * Function: getPublisher
 * Description: Sends a request to retrieve publisher data.
 * @param {object} data - The request body containing the necessary data for retrieving the publisher.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

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

/**
 * Function: getPublisherWithPublisherID
 * Description: Sends a request to retrieve publisher data using the publisher ID.
 * @param {string} publisherID - The publisher ID.
 * @returns {Promise} - A promise that resolves to the response JSON or a status code.
 */

export async function getPublisherWithPublisherID(publisherID){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getPublisherWithPublisherID?publisherID=${publisherID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}


/**
 * Function: getAllArticles
 * Description: Sends a request to retrieve all accepted articles.
 * @param {string} useID - The user ID.
 * @param {number} pageNo - The page number.
 * @param {number} PageSize - The page size.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getAllArticles(useID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAcceptedArticles?pageNo=${pageNo}&pageSize=${PageSize}&userID=${useID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

/**
 * Function: getAllRequiredArticles
 * Description: Sends a request to retrieve all required accepted articles.
 * @param {string} query - The query parameter.
 * @param {string} useID - The user ID.
 * @param {number} pageNo - The page number.
 * @param {number} PageSize - The page size.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getAllRequiredArticles(query,useID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllRequiredAcceptedArticles?pageNo=${pageNo}&pageSize=${PageSize}&userID=${useID}&query=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) return "Error"
    return response.json();
}

/**
 * Function: getArticleTopics
 * Description: Sends a request to retrieve article topics.
 * @param {object} data - The request body containing the necessary data for retrieving the article topics.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

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


/**
 * Function: getAllUploadedArticlesBySpecificPublisher
 * Description: Sends a request to retrieve all uploaded articles by a specific publisher.
 * @param {string} publisherID - The publisher ID.
 * @param {number} pageNo - The page number.
 * @param {number} PageSize - The page size.
 * @returns {Promise} - A promise that resolves to the response JSON or a status code.
 */


export async function getAllUploadedArticlesBySpecificPublisher(publisherID, pageNo, PageSize){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllUploadedArticlesBySpecificPublisher?pageNo=${pageNo}&pageSize=${PageSize}&publisherID=${publisherID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if(response.status===httpStatusInternalServerError) return httpStatusInternalServerError;
    return response.json();
}
/**
 * Function: updateAddedArticles
 * Description: Sends a request to update added articles.
 * @param {object} data - The request body containing the necessary data for updating the added articles.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function updateAddedArticles(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/saveAuthorPapers`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return "Error"
    return response.status;
}

/**
 * Function: deleteAuthorPapers
 * Description: Sends a request to delete author papers.
 * @param {object} data - The request body containing the necessary data for deleting the author papers.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function deleteAuthorPapers(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/deleteAuthorPapers`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return "Error"
    return response.status;
}

/**
 * Function: saveUploadArticle
 * Description: Sends a request to save an uploaded article.
 * @param {object} data - The request body containing the necessary data for saving the uploaded article.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function saveUploadArticle(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/saveUploadArticle`, {
        method: post,
        // headers:requestHeaders,
        body: data
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: getSavedArticles
 * Description: Sends a request to retrieve saved articles for a user.
 * @param {string} userID - The user ID.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getSavedArticles(userID){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getSavedArticles?userID=${userID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAcceptedPublishedArticles
 * Description: Sends a request to retrieve accepted and published articles by a specific publisher.
 * @param {number} pageNo - The page number.
 * @param {number} pageSize - The page size.
 * @param {string} publisherID - The publisher ID.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getAcceptedPublishedArticles(pageNo, pageSize,publisherID){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAcceptedArticlesBySpecificPublisher?pageNo=${pageNo}&pageSize=${pageSize}&publisherID=${publisherID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getTopics
 * Description: Sends a request to retrieve topics for an article using the DOI.
 * @param {string} DOI - The DOI (Digital Object Identifier) of the article.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getTopics(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleTopic?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAuthors
 * Description: Sends a request to retrieve authors for an article using the DOI.
 * @param {string} DOI - The DOI (Digital Object Identifier) of the article.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getAuthors(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleAuthors?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getPDF
 * Description: Sends a request to retrieve the PDF for an article using the DOI.
 * @param {string} DOI - The DOI (Digital Object Identifier) of the article.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getPDF(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticlePDFWithID?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter
 * Description: Sends a request to retrieve all accepted articles by a specific publisher with a query parameter.
 * @param {number} pageNo - The page number.
 * @param {number} pageSize - The page size.
 * @param {string} publisherID - The publisher ID.
 * @param {string} query - The query parameter.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter(pageNo, pageSize, publisherID, query){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllAcceptedArticlesBySpecificPublisherHavingQueryParameter?pageNo=${pageNo}&pageSize=${pageSize}&publisherID=${publisherID}&q=${query}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getCitations
 * Description: Sends a request to retrieve the citations for a paper using the paper ID (DOI).
 * @param {string} DOI - The DOI (Digital Object Identifier) of the paper.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getCitations(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceGraphReading}/papers/citing?paperId=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getCitedPapers
 * Description: Sends a request to retrieve the papers cited by a specific paper using the paper ID (DOI).
 * @param {string} DOI - The DOI (Digital Object Identifier) of the paper.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getCitedPapers(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceGraphReading}/papers/cited/ID?paperId=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: getCitedPaperTitles
 * Description: Sends a request to retrieve the titles of papers cited by a specific paper using the paper ID (DOI).
 * @param {string} DOI - The DOI (Digital Object Identifier) of the paper.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getCitedPaperTitles(DOI){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getArticleTitle?DOI=${DOI}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

/**
 * Function: removeSavedArticles
 * Description: Sends a request to remove saved articles.
 * @param {object} data - The request body containing the necessary data for removing the saved articles.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function removeSavedArticles(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/removeArticle`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: getCitingArticles
 * Description: Sends a request to retrieve articles citing a specific paper.
 * @param {object} data - The request body containing the necessary data for retrieving the citing articles.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getCitingArticles(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getAllCitingArticles`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}

