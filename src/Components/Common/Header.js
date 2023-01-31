import React from "react";

export default function Header() {
    return (
        <>
            <header className="App-header">
                <div className={"logo-div"}>
                <img src={process.env.PUBLIC_URL+"/Images/Logo/Logo.png"} alt={"logo"}/>
                </div>
                <div className={"header-options"}>
                    <ul>
                        <li><a href={"#"}>Home</a></li>
                        <li><a href={"#"}>About</a></li>
                        <li><a href={"#"}>Contact</a></li>
                        <li><a href={"#"}>Login</a></li>

                    </ul>
                </div>
            </header>
        </>
    );
}
