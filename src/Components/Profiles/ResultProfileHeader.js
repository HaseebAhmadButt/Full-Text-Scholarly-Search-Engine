import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ResultsShowing from "../Result Page/ResultsShowing";
import {Button} from "react-bootstrap";
// import

export default function ResultProfileHeader() {
    return (
        <>
            <div className={"profile_div"}>
                <div className={"profile_header_div"}>
                    <Card className={"Card_Div"}>
                        <Card.Img src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"} className={"Profile_Image"} alt={"profile_image"}/>
                        <Card.Body>
                            <Card.Title>
                                Name of Profile Holder
                            </Card.Title>
                            <Card.Subtitle className={"text-muted"}>
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
                                <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>
                                    <span className={"title"}>Citing Authors </span>
                                    <h1>10</h1>
                                </ListGroup.Item></a>
                            </ListGroup>
                            <Button variant={"primary"} className={"follow-button"}>Follow</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className={"profile_content_div"}>

                </div>
            </div>

        </>
    );

}