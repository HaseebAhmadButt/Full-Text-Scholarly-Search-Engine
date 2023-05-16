import React, {useContext, useState} from "react";
// import React from "react";
import {Button} from "react-bootstrap";
import navigation from "./Images/navigation.png";
import user_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
import {useNavigate} from "react-router-dom";


export default function SearchHeader() {
    const context = useContext(user_Sign_In_Context)
    const navigator = useNavigate()


    const [isNavClicked, setIsNavClicked] = useState(true);

    const handleNavigationClick = () => {
      setIsNavClicked((prevIsNavClicked) => !prevIsNavClicked);
    };
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
        <div id="mobile">
        <img  className="navigation-icon"
          src={navigation}
          alt="Navigation Icon"
          onClick={handleNavigationClick}
        />
      </div>
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
                        <li
                            style={{cursor:"pointer"}}
                            className={"Laptop-LogIn"}><a onClick={()=>{navigator("/signIn")}}>Login</a></li>
                    </ul>
                </div>
                {context.userLogIn.isAuthenticated?
                    <div className={`login-Div ${isNavClicked ? "nav-clicked" : ""}` }>
                        <ul>
                            <li>
                                <img
                                    onClick={()=>{handleNavigation()}}
                                    src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"}
                                    className={"header-image"}/>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className={`login-Div ${isNavClicked ? "nav-clicked" : ""}` }>
                        <ul>
                            <li>
                                <Button
                                    onClick={()=>{navigator("/signIn")}}
                                > Login</Button>
                            </li>
                        </ul>
                    </div>
                }
                {/*<div className={"login-Div"}>*/}
                {/*    <ul>*/}
                {/*        <li><a href={"/signIn"}><Button> Login</Button></a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

            </header>
        </>
    );
}
