import React  from "react";
import {Form, Button} from "react-bootstrap";
import {faFacebook, faTwitter, faLinkedin, faInstagram  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer className={"footer"}>
            <div className={"footer-detail"}>
                <div className={"purpose"}>
                    <h2>Purpose</h2>
                    <p>The desert wind blew the tumbleweed in front of the car. Alex swerved to avoid the tumbleweed, but he turned the wheel a bit too strong and the car left the road and skidded onto the dirt median. He instantly slammed on the brakes and the car stopped in a cloud of dirt. When the dust cloud had settled and he could see around him again, he realized that he'd somehow crossed over into an entirely new dimension.</p>
                </div>
                <div className={"categories"}>
                    <h2>Categories</h2>
                    <ul>
                        <li className={'Footer-list'}><a href={"#"}>Natural Language Processing</a></li>
                        <li className={'Footer-list'}><a href={"#"}>Digital Image Processing</a></li>
                        <li className={'Footer-list'}><a href={"#"}>Distributed Computing</a></li>
                        <li className={'Footer-list'}><a href={"#"}>Biotech</a></li>
                        <li className={'Footer-list'}><a href={"#"}>Fluid mechanics</a></li>
                        <li className={'Footer-list'}><a href={"#"}>Security</a></li>
                    </ul>
                </div>
                <div className={"suggestions"}>
                    <h2>Send Your Suggestions</h2>
                    <Form>
                        <Form>
                            <Form.Control type={"text"} placeholder={"Suggestion Title"} />
                            <br/>
                            <Form.Control as={"textarea"} rows={3} placeholder={"Enter your suggestions here"} />
                            <br/>
                            <Button variant={"primary"} type={"submit"} className={"button"}>Submit</Button>
                        </Form>
                    </Form>
                </div>
            </div>
            <hr />
            <div className={"footer-social-media-copyright"}>
                <div className={'CopyRight'}>
                    <p>Copyright © {(new Date()).getFullYear()} All Rights Reserved</p>
                </div>
                <div className={'SocialMedia'}>
                    <ul>
                        <li><a href={"#"}><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href={"#"}><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href={"#"}><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href={"#"}><FontAwesomeIcon icon={faLinkedin} /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}