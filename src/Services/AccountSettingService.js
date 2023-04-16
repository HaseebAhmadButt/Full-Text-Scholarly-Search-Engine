import {ApiGatewayURL, serviceSQLReading, serviceSQLWriting, requestHeaders, post, put} from "./apiConstants"
export async function changeName(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changeName`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===404) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

export async function changeEmail(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changeEmail`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===404) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}
export async function changePicture(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/changePicture`, {
        method: put,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===404) return "Not Found";
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

