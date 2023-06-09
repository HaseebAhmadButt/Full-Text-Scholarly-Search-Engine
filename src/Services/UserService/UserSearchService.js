import {
    ApiGatewayURL,
    requestHeaders,
    httpGet,
    httpStatusNotFound,
    httpStatusInternalServerError, serviceSolrReading, serviceSQLWriting, post
} from "../apiConstants"

/**
 * Function: getResults
 * Description: Sends a request to retrieve search results based on the provided query.
 * @param {string} query - The search query.
 * @returns {Promise} - A promise that resolves to the response JSON or an error status code.
 */

export async function getResults(query){
    // ${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}
    try{
        const response = await fetch(`${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}`, {
            method: httpGet,
            headers: requestHeaders,
        });
        if (response.status === httpStatusNotFound) return httpStatusNotFound;
        if (!response.ok) return httpStatusInternalServerError
        return response.json();
    }
    catch (e){
        return "FETCH-ERROR"
    }
}

/**
 * Function: saveArticle
 * Description: Sends a request to save an article.
 * @param {object} body - The request body containing the article data to be saved.
 * @returns {Promise} - A promise that resolves to the response status code or an error status code.
 */

export async function saveArticle(body){
    // ${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/saveArticle`, {
        method: post,
        headers:requestHeaders,
        body:JSON.stringify(body)
    });
    // if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.status;
}

/**
 * Function: submitContactForm
 * Description: Sends a request to submit a contact form.
 * @param {object} body - The request body containing the contact form data.
 * @returns {Promise} - A promise that resolves to the response body or an error status code.
 */

export async function submitContactForm(body){
    // ${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/sendEmailFromContact`, {
        method: post,
        headers:requestHeaders,
        body:JSON.stringify(body)
    });
    // if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.body;
}

/**
 * Function: submitSuggestionForm
 * Description: Sends a request to submit a suggestion form.
 * @param {object} body - The request body containing the suggestion form data.
 * @returns {Promise} - A promise that resolves to the response body or an error status code.
 */

export async function submitSuggestionForm(body){
    // ${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/sendSuggestionEmailFromContact`, {
        method: post,
        headers:requestHeaders,
        body:JSON.stringify(body)
    });
    // if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.body;
}

/**
 * Function: getSavedArticleID
 * Description: Sends a request to retrieve the saved article IDs for a user.
 * @param {string} userID - The ID of the user.
 * @returns {Promise} - A promise that resolves to the response JSON or an error status code.
 */

export async function getSavedArticleID(userID){
    // ${ApiGatewayURL}/${serviceSolrReading}/retrieveDocument?query=${query}
    const response = await fetch(`${ApiGatewayURL}/${serviceSolrReading}/getSavedArticleIDs?userID=${userID}`, {
        method: httpGet,
        headers:requestHeaders,
    });
    // if(response.status===httpStatusNotFound) return httpStatusNotFound;
    if (!response.ok) return httpStatusInternalServerError
    return response.json();
}