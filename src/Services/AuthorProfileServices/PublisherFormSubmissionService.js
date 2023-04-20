import {
    ApiGatewayURL,
    serviceSQLReading,
    serviceSQLWriting,
    requestHeaders,
    post,
    httpStatusConflict,
    httpStatusInternalServerError
} from "../apiConstants"


export async function createSimplePublisher(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/createSimplePublisher`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}

export async function createPartialPublisher(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/updatePublisherPartial`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.statusText}`);}
    return response.status;
}
export async function createPublisherProfile(data){
    const response = await fetch(`${ApiGatewayURL}/${serviceSQLWriting}/createPublisherProfile`, {
        method: post,
        headers:requestHeaders,
        body: JSON.stringify(data)
    });
    if(response.status===httpStatusConflict) return httpStatusConflict;
    if (!response.ok) return httpStatusInternalServerError;
    return response.status;
}