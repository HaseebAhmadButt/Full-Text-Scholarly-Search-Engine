import React, { useState } from "react";
// import React from "react";
import {Button} from "react-bootstrap";
import navigation from "./Images/navigation.png";


export default function SearchHeader() {

    const [isNavClicked, setIsNavClicked] = useState(true);

    const handleNavigationClick = () => {
      setIsNavClicked((prevIsNavClicked) => !prevIsNavClicked);
    };
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
                <a href={"/"}> <img src={process.env.PUBLIC_URL+"/Images/Logo/Logo.png"} alt={"logo"}/> </a>
                </div>
                <div className={"header-options"}>
                    <ul>
                        <li><a href={"/"}>Home</a></li>
                        <li><a href={"/aboutUs"}>About</a></li>
                        <li><a href={"/contact"}>Contact</a></li>
                        <li className={"Laptop-LogIn"}><a href={"/signIn"}>Login</a></li>
                    </ul>
                </div>
                <div className={"login-Div"}>
                    <ul>
                        <li><a href={"/signIn"}><Button> Login</Button></a></li>
                    </ul>
                </div>

            </header>
        </>
    );
}
