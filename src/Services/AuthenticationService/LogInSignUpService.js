import {ApiGatewayURL, serviceSQLReading, serviceSQLWriting, requestHeaders, post, put, httpStatusConflict, httpStatusNotFound} from "../apiConstants"

/**
 * Function: UserSignUp
 * Description: Sends a request to create a user account.
 * @param {object} data - The request body containing the necessary user sign-up data.
 * @returns {Promise} - A promise that resolves to the response data or an error message.
 */

export async function UserSignUp(data){
        const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/createAccount`, {
            method: post,
            headers:requestHeaders,
            body: JSON.stringify(data)
        });
        if(response.status===httpStatusConflict) return "E-Mail Already Exists";
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
        return await response.json();
}

/**
 * Function: changePassword
 * Description: Sends a request to change the user's password.
 * @param {object} data - The request body containing the necessary data for changing the password.
 * @returns {Promise} - A promise that resolves to the status code of the response or an error message.
 */

export async function changePassword(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changePassword`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusNotFound) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}


/**
 * Function: UserLogIn
 * Description: Sends a request to log in a user.
 * @param {object} data - The request body containing the necessary data for user login.
 * @returns {Promise} - A promise that resolves to the response data or an error message.
 */

export async function UserLogIn(data){
    const LogInUser = await fetch(`${ApiGatewayURL}/${serviceSQLReading}/userSignIn`,{
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    })

    console.log(LogInUser)

    if(LogInUser.status === httpStatusNotFound) return "Not Found";
    if (!LogInUser.ok) {throw new Error(`HTTP error! status: ${LogInUser.statusText}`);}
    return await LogInUser.json();
}


