import {ApiGatewayURL, serviceSQLReading, serviceSQLWriting, requestHeaders, put, httpStatusNotFound} from "../apiConstants"

/**
 * Function: changeName
 * Description: Sends a request to change the user's name.
 * @param {object} data - The request body containing the necessary data for changing the name.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function changeName(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changeName`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

/**
 * Function: changeEmail
 * Description: Sends a request to change the user's email.
 * @param {object} data - The request body containing the necessary data for changing the email.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function changeEmail(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changeEmail`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

/**
 * Function: changePicture
 * Description: Sends a request to change the user's profile picture.
 * @param {object} data - The request body containing the necessary data for changing the profile picture.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function changePicture(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changePicture`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

