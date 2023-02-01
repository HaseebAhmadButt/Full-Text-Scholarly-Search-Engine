import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {faCog} from "@fortawesome/free-solid-svg-icons";
import ResultsShowing from "../Result Page/ResultsShowing";
import {Button, FormGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import

export default function ResultProfileHeader(props) {
    const {functionCalled} = props;
    return (
        <>
            <div className={"profile_div"}>
                <Card className={"Card_Div"}>
                    <Card.Img src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"} className={"Profile_Image"} alt={"profile_image"}/>
                    <Card.Body clssName={"Card-Body"}>
                        <Card.Title className={"text-area"}>
                            Name of Profile Holder
                        </Card.Title>
                        <Card.Subtitle className={"text-muted text-area"}>
                            <Card.Text>
                                Other Names with which the profile holder is known
                            </Card.Text>
                        </Card.Subtitle>
                        <Card.Text className={"text-area"}>
                            <b> Email: </b> someOne@gmail.com
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            <b> Affiliation: </b> Some Institution
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            <b>Research Areas:</b>
                            <a href={"#"} className={'interests'}><span >Natural Language Processing,</span></a>
                            <a href={"#"} className={'interests'}><span >Data Science,</span></a>
                            <a href={"#"} className={'interests'}><span >Computer Vision,</span></a>
                            <a href={"#"} className={'interests'}><span >Artificial Intelligence,</span></a>
                            <a href={"#"} className={'interests'}><span >Deep Learning,</span></a>
                            <a href={"#"} className={'interests'}><span >Machine Learning</span></a>
                        </Card.Text>
                        <ListGroup className={"profile-features"}>
                            <a href={"#"} className={"profile-feature"}>
                                <ListGroup.Item className={"feature"}>
                                    <span className={"title"}>Publications </span>
                                    <h1>10</h1>
                                </ListGroup.Item></a>
                            <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>
                                <span className={"title"}>Citations </span>
                                <h1>10</h1>
                            </ListGroup.Item></a>
                            <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>
                                <span className={"title"}>Co-Authors </span>
                                <h1>10</h1>
                            </ListGroup.Item></a>
                            <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>
                                <span className={"title"}>Cited Authors </span>
                                <h1>10</h1>
                            </ListGroup.Item></a>
                        </ListGroup>
                        <FormGroup>
                            <Button variant={"primary"} className={"follow-button"} onClick={functionCalled}>Follow/Edit</Button>
                        </FormGroup>
                    </Card.Body>
                </Card>
            </div>
        </>
    );

}