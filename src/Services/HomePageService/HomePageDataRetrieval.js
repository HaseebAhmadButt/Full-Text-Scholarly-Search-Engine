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
 * Function: createSimplePublisher
 * Description: Sends a request to create a simple publisher.
 * @param {object} data - The request body containing the necessary data for creating a simple publisher.
 * @returns {Promise} - A promise that resolves to the status code of the response or throws an error.
 */

export async function getTopics() {
    try {
        const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getTopics`, {
            method: httpGet,
            headers: requestHeaders,
        });
        if (response.status === httpStatusNotFound) return httpStatusNotFound;
        if (!response.ok) return httpStatusInternalServerError;
        return response.json();
    } catch (error) {
        // console.error(error);
        return "FETCH_ERROR"; // return a custom error message or code
    }
}

/**
 * Function: createPartialPublisher
 * Description: Sends a request to create a partial publisher.
 * @param {object} data - The request body containing the necessary data for creating a partial publisher.
 * @returns {Promise} - A promise that resolves to the status code of the response or throws an error.
 */

export async function getRecentArticles() {
    try {
        const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getRecentArticles`, {
            method: httpGet,
            headers: requestHeaders,
        });
        if (response.status === httpStatusNotFound) return httpStatusNotFound;
        if (!response.ok) return httpStatusInternalServerError;
        return response.json();
    } catch (error) {
        // console.error(error);
        return "FETCH_ERROR"; // return a custom error message or code
    }
}

/**
 * Function: createPublisherProfile
 * Description: Sends a request to create a publisher profile.
 * @param {object} data - The request body containing the necessary data for creating a publisher profile.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function getTopCitedArticles(){
    try{
        const response = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/getTopCitedArticles`, {
            method: httpGet,
            headers: requestHeaders,
        });
        if (response.status === httpStatusNotFound) return httpStatusNotFound;
        if (!response.ok) return httpStatusInternalServerError
        return response.json();
    }
    catch (error) {
        // console.error(error);
        return "FETCH_ERROR"; // return a custom error message or code
    }
}