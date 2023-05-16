import {
    ApiGatewayURL,
    requestHeaders,
    httpGet,
    httpStatusNotFound,
    httpStatusInternalServerError, serviceSolrReading, serviceSQLWriting, post
} from "../apiConstants"
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