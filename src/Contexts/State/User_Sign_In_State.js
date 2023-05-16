import React, { useEffect, useState } from "react";
import User_Sign_In_Context from "../Context/User_Sign_In_Context";
import data from "bootstrap/js/src/dom/data";

const User_Sign_In_State = ({ children }) => {
    const [userLogIn, setLogIn] = useState({
        user_id: "",
        user_email: "",
        user_name: "",
        user_picture: "",
        isAdmin: false,
        isAuthenticated: false,
        isPublisher: false,
        publisherStatus:false,
        publisherID: 0,
        savedArticles: []

    });
    const [publisher, setPublisher] = useState({
        affiliationLink: "",
        affiliationName:"",
        publisherEmail: "",
        publisherHIndex: 0,
        publisherHMedian: 0,
        publisherID:0,
        publisherName: "",
        publisherSite: "",
        publisherStatus: "",
        interests:[],
        names:[]

    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        const updateState  = async () =>{
        // Check if there is any user log-in information available in local storage
        const userLogInStorage = localStorage.getItem("userLogIn");
        const publisherStorage = localStorage.getItem("publisherStorage");
        if (userLogInStorage) {
            const JsonData = JSON.parse(userLogInStorage);
            await setLogIn({
                user_id: JsonData.user_id,
                user_email: JsonData.user_email,
                user_name: JsonData.user_name,
                user_picture: JsonData.user_picture,
                isAdmin: JsonData.isAdmin,
                isAuthenticated: JsonData.isAuthenticated,
                isPublisher: JsonData.isPublisher,
                publisherStatus:JsonData.publisherStatus,
                publisherID: JsonData.publisherID,
                savedArticles: JsonData.savedArticles

            });
        }
        if(publisherStorage){
            await setPublisher({
                affiliationLink: publisherStorage.affiliationLink,
                affiliationName:publisherStorage.affiliationName,
                publisherEmail: publisherStorage.publisherEmail,
                publisherHIndex: publisherStorage.publisherHIndex,
                publisherHMedian: publisherStorage.publisherHMedian,
                publisherID:publisherStorage.publisherID,
                publisherName: publisherStorage.publisherName,
                publisherSite: publisherStorage.publisherSite,
                publisherStatus: publisherStorage.publisherStatus,
                interests:publisherStorage.interests,
                names:publisherStorage.names

            })
        }
        }
        updateState().then()
    }, []);
    const addSavedArticle = (article) => {
        setLogIn(prevState => ({
            ...prevState,
            savedArticles: [...prevState.savedArticles, article]
        }));
    }
    const addSavedArticleIDs = async (article) => {
        await setLogIn(prevState => ({
            ...prevState,
            savedArticles: article
        }));
        localStorage.setItem("userLogIn", JSON.stringify(userLogIn));

    }

    const deleteSavedArticle = (articleId) => {
        setLogIn(prevState => ({
            ...prevState,
            savedArticles: prevState.savedArticles.filter(article => article !== articleId)
        }));
    }

    const deleteSavedArticles = (articleIds) => {
        setLogIn(prevState => {
            const newSavedArticles = prevState.savedArticles.filter(article => !articleIds.includes(article));
            return {
                ...prevState,
                savedArticles: newSavedArticles
            };
        });
    };



    const upDateStateOnLogIn = async (
        id,
        email,
        name,
        picture,
        isAdmin,
        isAuthenticated,
        isPublisher,
        publisherStatus
    ) => {
        await setLogIn(()=>{
            const userData = {
                user_id: id,
                user_email: email,
                user_name: name,
                user_picture: picture,
                isAdmin: isAdmin,
                isAuthenticated: isAuthenticated,
                isPublisher: isPublisher,
                publisherStatus:publisherStatus,
                savedArticles: []
            };

            // user_id: JsonData.user_id,
            //                 user_email: JsonData.user_email,
            //                 user_name: JsonData.user_name,
            //                 user_picture: JsonData.user_picture,
            //                 isAdmin: JsonData.isAdmin,
            //                 isAuthenticated: JsonData.isAuthenticated,
            //                 isPublisher: JsonData.isPublisher,
            //                 publisherStatus:JsonData.publisherStatus,
            //                 publisherID: JsonData.publisherID
            // console.log("Updating Local Storage")
            // Save the updated user log-in information in local storage
            // Save the updated user log-in information in local storage


            localStorage.setItem("userLogIn", JSON.stringify(userData));

            // console.log("Local Storage Updated", localStorage.getItem("userLogIn"));
            return userData;

        });
    };
    const updatePublisherField = async (value) =>{
        if(!userLogIn.publisherStatus) return
        await setLogIn((prevState) => ({...prevState, isPublisher: value}))
    }

    const updatePublisherID = async (ID) =>{
        await setLogIn((prevState) => ({...prevState, publisherID: ID}))
    }

    const upDataPublisher = async (publisherData) =>{
        await setPublisher(publisherData)
        localStorage.setItem("publisherStorage", JSON.stringify(publisherData));

    }

    const upDateStateOnLogOut = () => {
        setLogIn({
            user_id: "",
            user_email: "",
            user_name: "",
            user_picture: "",
            isAdmin: false,
            isAuthenticated: false,
            isPublisher: false,
            publisherID: 0
        });
        // Remove the user log-in information from local storage
        localStorage.removeItem("userLogIn");
    };
    const upDatePublisherOnLogOut = () => {
        setPublisher({
            affiliationLink: "",
            affiliationName:"",
            publisherEmail: "",
            publisherHIndex: 0,
            publisherHMedian: 0,
            publisherID:0,
            publisherName: "",
            publisherSite: "",
            publisherStatus: "",
            interests:[],
            names:[]
        })
        localStorage.removeItem('userLogIn');
        localStorage.removeItem('publisherStorage');

    };


    return (
        <User_Sign_In_Context.Provider
            value={{ userLogIn, publisher, upDateStateOnLogIn,
                     upDateStateOnLogOut, upDatePublisherOnLogOut, updatePublisherField,
                     upDataPublisher, addSavedArticle, deleteSavedArticle, addSavedArticleIDs,
                     deleteSavedArticles}}
        >
            {children}
        </User_Sign_In_Context.Provider>
    );
};

export default User_Sign_In_State;
