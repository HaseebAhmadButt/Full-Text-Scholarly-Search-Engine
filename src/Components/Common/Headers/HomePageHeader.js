import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import navigation from "./Images/navigation.png";
import user_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";
import {useNavigate} from "react-router-dom";

export default function HomepageHeader() {
  const context = useContext(user_Sign_In_Context)
  console.log(context)

  const navigator = useNavigate()
  const [isNavClicked, setIsNavClicked] = useState(false);
  const handleNavigationClick = () => {
    setIsNavClicked((prevIsNavClicked) => !prevIsNavClicked);
  };

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
            <li>
              <a href={"/"}>
                Home
              </a>
            </li>
            <li><a href={"/aboutUs"}>About</a></li>
            <li><a href={"/contact"}>Contact</a></li>
            <li className={"Laptop-LogIn"}><a href={"/signIn"}>Login</a></li>
          </ul>
        </div>
        {context.userLogIn.isAuthenticated?
            <div className={`login-Div ${isNavClicked ? "nav-clicked" : ""}` }>
              <ul>
                <li>
                  <img
                      onClick={()=>{navigator("/personalProfile")}}
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
