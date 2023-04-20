import {ApiGatewayURL, serviceSQLReading, serviceSQLWriting, requestHeaders, post, put, httpStatusConflict, httpStatusNotFound} from "../apiConstants"
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


