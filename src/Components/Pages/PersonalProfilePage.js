import ProfileHeader from "../Common/Headers/ProfileHeaders";
import PersonalProfile from "../Profiles/User Profile/PersonalProfile";
import Footer from "../Common/Footer";
import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
export const PersonalProfilePage = ()=>{
    console.log(localStorage.getItem("userLogIn"))
    const navigator = useNavigate();
    const context = useContext(User_Sign_In_Context)
    console.log("From Profile: ",context.userLogIn)
    useEffect(() => {
        if (!context.userLogIn.isAuthenticated) {
            navigator("/");
        }
    }, [navigator, context.userLogIn]);

    // console.log(context.userLogIn.isAuthenticated);


    return(<><ProfileHeader /><PersonalProfile /><Footer /></>)
}