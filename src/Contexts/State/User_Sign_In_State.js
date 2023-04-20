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
        publisherID: 0

    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        const updateState  = async () =>{
        // Check if there is any user log-in information available in local storage
        const userLogInStorage = localStorage.getItem("userLogIn");
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
                publisherID: 0
            });
        }
        }
        updateState().then()
    }, []);
    const upDateStateOnLogIn = async (
        id,
        email,
        name,
        picture,
        isAdmin,
        isAuthenticated,
        isPublisher
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
            };

            // console.log("Updating Local Storage")
            // Save the updated user log-in information in local storage
            // Save the updated user log-in information in local storage


            localStorage.setItem("userLogIn", JSON.stringify(userData));

            // console.log("Local Storage Updated", localStorage.getItem("userLogIn"));
            return userData;

        });
    };
    const updatePublisherField = async (value) =>{
        await setLogIn((prevState) => ({...prevState, isPublisher: value}))
    }

    const updatePublisherID = async (ID) =>{
        await setLogIn((prevState) => ({...prevState, publisherID: ID}))
    }


    const upDateStateOnLogOut = () => {
        setLogIn({
            user_id: "",
            user_email: "",
            user_name: "",
            user_picture: "",
            isAdmin: false,
            isAuthenticated: "",
            isPublisher: false,
        });
        // Remove the user log-in information from local storage
        localStorage.removeItem("userLogIn");
    };


    return (
        <User_Sign_In_Context.Provider
            value={{ userLogIn, upDateStateOnLogIn, upDateStateOnLogOut,updatePublisherField }}
        >
            {children}
        </User_Sign_In_Context.Provider>
    );
};

export default User_Sign_In_State;
