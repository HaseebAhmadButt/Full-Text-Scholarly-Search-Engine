import React from "react";
import BackgroundImage from "../../Background Images/Home-Background.png";
import {Form, Button, InputGroup} from "react-bootstrap";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SearchArea() {
        const OpenResearchable = (e) => {
            e.preventDefault();
            window.location.href = "/results";
        }
        return (
            <>
                <div  className={"search-area"}>
                    <div className={"search-area-content"}>
                        <div className={"search-content"}>
                            <h1>kNowledge Verse</h1>
                            <h3>A free, AI-powered research tool for scientific literature</h3>
                            <div className={"search-form"}>
                                <Form className={"form"} >
                                        <Form.Control type="text" placeholder="Search for a paper, author, or topic" className={"search-input"}/>
                                        <Button type="submit" className={"search-button"} onClick={OpenResearchable}><FontAwesomeIcon icon={faSearchengin}/></Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
}
