import {
    ApiGatewayURL,
    serviceSQLReading,
    serviceSQLWriting,
    requestHeaders,
    post,
    httpStatusConflict,
    httpStatusInternalServerError
} from "../apiConstants"

/**
 * Function: createSimplePublisher
 * Description: Sends a request to create a simple publisher.
 * @param {object} data - The request body containing the necessary data for creating a simple publisher.
 * @returns {Promise} - A promise that resolves to the status code of the response or throws an error.
 */

export async function createSimplePublisher(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/createSimplePublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

/**
 * Function: createPartialPublisher
 * Description: Sends a request to create a partial publisher.
 * @param {object} data - The request body containing the necessary data for creating a partial publisher.
 * @returns {Promise} - A promise that resolves to the status code of the response or throws an error.
 */

export async function createPartialPublisher(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/updatePublisherPartial`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

/**
 * Function: createPublisherProfile
 * Description: Sends a request to create a publisher profile.
 * @param {object} data - The request body containing the necessary data for creating a publisher profile.
 * @returns {Promise} - A promise that resolves to the response JSON or an error message.
 */

export async function createPublisherProfile(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/createPublisherProfile`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusConflict) return httpStatusConflict;
    if (!response.ok) return httpStatusInternalServerError;
    return response.json();
}