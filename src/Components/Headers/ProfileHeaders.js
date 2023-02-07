import React from "react";
import {Button} from "react-bootstrap";

export default function ProfileHeader() {
    return (
        <>
            <header className="App-header">
                <div className={"logo-div"}>
                    <a href={"/"}> <img src={process.env.PUBLIC_URL+"/Images/Logo/Logo.png"} alt={"logo"}/> </a>
                </div>
                <div className={"header-options"}>
                    <ul>
                        <li><a href={"/"}>Home</a></li>
                        <li><a href={"/aboutUs"}>About</a></li>
                        <li><a href={"/contact"}>Contact</a></li>
                        {/*<li className={"Laptop-LogIn"}><a href={"/signIn"}>Login</a></li>*/}
                    </ul>
                </div>
                <div className={"login-Div profile-pic-div"}>
                    <ul>
                        <li>
                            <a href={"#"}>
                                <img src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"} className={"header-image"}/>
                            </a>
                        </li>
                    </ul>
                </div>
                {/*<a href={"#"}><Button> Login</Button></a>*/}
            </header>
        </>
    );
}
