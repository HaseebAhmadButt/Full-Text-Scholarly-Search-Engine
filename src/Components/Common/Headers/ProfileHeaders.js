import React, {useContext} from "react";
import {Button} from "react-bootstrap";
import user_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
import {useNavigate} from "react-router-dom";

export default function ProfileHeader() {
    const context = useContext(user_Sign_In_Context)
    const navigator = useNavigate()
    const handleNavigation = ()=>{
        if(context.userLogIn.isAdmin){
            navigator("/admin")
        }
        else{
            navigator("/personalProfile")
        }
    }
    return (
        <>
            <header className="App-header">
                <div className={"logo-div"}>
                    <img
                        onClick={()=>{
                            navigator("/")
                        }}

                        src={process.env.PUBLIC_URL+"/Images/Logo/Logo.png"} alt={"logo"}/>
                </div>
                <div className={"header-options"}>
                    <ul>
                        <li><a
                            style={{cursor:"pointer"}}
                            onClick={()=>{navigator("/")}}>Home</a></li>
                        <li><a
                            style={{cursor:"pointer"}}
                            onClick={()=>{navigator("/aboutUs")}}>About</a></li>
                        <li><a
                            style={{cursor:"pointer"}}
                            onClick={()=>{navigator("/contact")}}>Contact</a></li>
                        {/*<li*/}
                        {/*    style={{cursor:"pointer"}}*/}
                        {/*    className={"Laptop-LogIn"}><a onClick={()=>{navigator("/signIn")}}>Login</a></li>*/}
                    </ul>
                </div>
                <div className={"login-Div profile-pic-div"}>
                    <ul>
                        <li>
                            {/*<a href={"#"}>*/}
                                <img
                                    onClick={()=>{handleNavigation()}}
                                    src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"} className={"header-image"}/>
                            {/*</a>*/}
                        </li>
                    </ul>
                </div>
                {/*<a href={"#"}><Button> Login</Button></a>*/}
            </header>
        </>
    );
}
