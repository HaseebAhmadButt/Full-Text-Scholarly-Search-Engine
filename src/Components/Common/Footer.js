import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {faFacebook, faTwitter, faLinkedin, faInstagram  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {submitContactForm, submitSuggestionForm} from "../../Services/UserService/UserSearchService";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
import {getTopics} from "../../Services/HomePageService/HomePageDataRetrieval";

export default function Footer() {
    const [title, setTitle] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [topics, setTopics] = useState([])


    const handleSubmit =async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // submit form data
            const ObjectBody = {
                mailSubject:title,
                mailBody:suggestion,
            }
            const response = await submitSuggestionForm(ObjectBody)
            if(response===httpStatusInternalServerError)
            {
                alert("Internal Server Error. Can't Send Your Suggestion Right Now")
            }
            else
            {
                alert("Suggestion Sent Successfully")
            }
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = () => {
        let errors = {};
        if (title.trim() === '') {
            errors.title = 'Please enter a suggestion title';
            alert('Please enter a suggestion title')
        }
        if (suggestion.trim() === '') {
            errors.suggestion = 'Please enter your suggestion';
            alert('Please enter your suggestion')
        }
        return errors;
    };

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await getTopics();
            if(response === httpStatusNotFound) {
                // await setErrors({noData: true, serverError: false});
            } else if (response === httpStatusInternalServerError||response==="FETCH_ERROR") {
                // await setErrors({noData: false, serverError: true});
            } else {
                await setTopics(response);
            }
        };
        fetchTopics().then();
    }, []);

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
                        {/*{topics.map((topic)=>{return(
                        <span
                            onClick={()=>{navigator(`/search/results/${topic}`)}}
                        className={'tags'}
                    >{topic}</span>)})}*/}
                        {topics.map((topic, index)=>{
                            if (index>5) return;
                            return(<li className={'Footer-list'}><a href={`/search/results/${topic}`}>{topic}</a></li>)
                        })}
                        {/*<li className={'Footer-list'}><a href={"#"}>Natural Language Processing</a></li>*/}
                        {/*<li className={'Footer-list'}><a href={"#"}>Digital Image Processing</a></li>*/}
                        {/*<li className={'Footer-list'}><a href={"#"}>Distributed Computing</a></li>*/}
                        {/*<li className={'Footer-list'}><a href={"#"}>Biotech</a></li>*/}
                        {/*<li className={'Footer-list'}><a href={"#"}>Fluid mechanics</a></li>*/}
                        {/*<li className={'Footer-list'}><a href={"#"}>Security</a></li>*/}
                    </ul>
                </div>
                <div className={"suggestions"}>
                    <h2>Send Your Suggestions</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Control
                                type="text"
                                placeholder="Suggestion Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                isInvalid={formErrors.title}
                                className={"suggestionTitle"}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formSuggestion">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your suggestions here"
                                value={suggestion}
                                onChange={(event) => setSuggestion(event.target.value)}
                                isInvalid={formErrors.suggestion}
                                className={"suggestionMessage"}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.suggestion}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="button">
                            Submit
                        </Button>
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