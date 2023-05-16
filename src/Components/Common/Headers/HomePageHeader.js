import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import navigation from "./Images/navigation.png";
import user_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
import {useNavigate} from "react-router-dom";

export default function HomepageHeader() {
  const context = useContext(user_Sign_In_Context)
  const navigator = useNavigate()
  const [isNavClicked, setIsNavClicked] = useState(false);
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
      <text>KnowledgeVerse</text>
      <img  className="navigation-icon"
            src={navigation}
            alt="Navigation Icon"
            onClick={handleNavigationClick}
      />

        </div>
      <header className={`App-header Home-Page-Header ${isNavClicked ? "nav-clicked" : ""}`}>
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
      </header>
    </>
  );
}
