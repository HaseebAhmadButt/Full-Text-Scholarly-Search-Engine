import React, { useState } from "react";
import { Button } from "react-bootstrap";
import navigation from "./Images/navigation.png";

export default function HomepageHeader() {
  const [isNavClicked, setIsNavClicked] = useState(true);

  const handleNavigationClick = () => {
    setIsNavClicked((prevIsNavClicked) => !prevIsNavClicked);
  };

  return (
    <>
      
      <header className={`App-header Home-Page-Header ${isNavClicked ? "nav-clicked" : ""}`}>
        <div className={"header-options"}>
          <ul>
            <li><a href={"/"}>Home</a></li>
            <li><a href={"/aboutUs"}>About</a></li>
            <li><a href={"/contact"}>Contact</a></li>
            <li className={"Laptop-LogIn"}><a href={"/signIn"}>Login</a></li>
          </ul>
        </div>
        <div className={`login-Div ${isNavClicked ? "nav-clicked" : ""}` }>
          <ul>
            <li><a href={"/signIn"}><Button> Login</Button></a></li>
          </ul>
        </div>
      </header>
    </>
  );
}
