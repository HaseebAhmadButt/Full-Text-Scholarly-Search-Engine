import React from "react";
import {Button} from "react-bootstrap";

export default function HomepageHeader() {
    return (
        <>
            <header className="App-header Home-Page-Header">
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
