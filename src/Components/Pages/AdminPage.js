import ProfileHeader from "../Common/Headers/ProfileHeaders";
import Footer from "../Common/Footer";
import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import AdminHome from "../Admin/Admin-Home";
export const AdminPage = ()=>{
    const navigator = useNavigate();
    const context = useContext(User_Sign_In_Context)
    useEffect(() => {
        if (!context.userLogIn.isAuthenticated && !context.userLogIn.isAdmin) {
            navigator("/");
        }
    }, [context.userLogIn.isAuthenticated]);

    return(<><ProfileHeader /><AdminHome /><Footer /></>)
}