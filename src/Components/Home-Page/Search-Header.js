import React from "react";
import BackgroundImage from "../../Background Images/Home-Background.png";
import {Form, Button, InputGroup} from "react-bootstrap";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SearchArea() {
        const BgImage = {
            backgroundImage: `url(${BackgroundImage})`,
        }
        return (
            <>
                {/*style={BgImage}*/}
                <div  className={"search-area"}>
                    <div className={"search-area-content"}>
                        <div className={"search-content"}>
                            <h1>kNowledge Verse</h1>
                            <h3>A free, AI-powered research tool for scientific literature</h3>
                            <div className={"search-form"}>
                                <Form className={"form"}>
                                    {/*<Form.Group controlId="UserSearch">*/}
                                        <Form.Control type="text" placeholder="Search for a paper, author, or topic" className={"search-input"}/>
                                        <Button type="submit" className={"search-button"}><FontAwesomeIcon icon={faSearchengin}/></Button>
                                    {/*</Form.Group>*/}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
}
