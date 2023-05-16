import {
    ApiGatewayURL,
    serviceSQLReading,
    requestHeaders,
    post,
    httpGet,
    httpStatusNotFound,
    serviceSQLWriting, httpStatusInternalServerError, serviceGraphReading
} from "../apiConstants"
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