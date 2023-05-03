import React, {useContext, useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Button, FormGroup} from "react-bootstrap";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {getPublisher} from "../../Services/AuthorProfileServices/PublisherDataService";

export default function ResultProfileHeader(props) {
    const {affiliationLink, affiliationName, publisherName,  names,interests, publisherEmail, publisherHIndex, publisherHMedian, publisherSite, publisherStatus} = props;
    // names,
    return (
        <>
            {<div className={"profile_div"}>
                <Card className={"Card_Div"}>
                    <Card.Img src={process.env.PUBLIC_URL + "/Images/Profile_Images/download.png"}
                              className={"Profile_Image"} alt={"profile_image"}/>
                    <Card.Body clssName={"Card-Body"}>
                        <Card.Title className={"text-area"}>
                            {publisherName}
                        </Card.Title>
                        <Card.Subtitle className={"text-muted text-area"}>
                            <Card.Text>
                                {names.length>0?<>other names are: {names.join(", ")}</>:""}
                            </Card.Text>
                        </Card.Subtitle>
                        <Card.Text className={"text-area"}>
                            <b> Email: </b> {publisherEmail}
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            {affiliationName !== ""?<><b> Affiliation: </b> <a href={affiliationLink}>{affiliationName}</a></>:""}
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            {interests.length > 0?<><b>Research Areas:</b>{interests.map((value)=>{return(<a href={"#"} className={'interests'}><span>{value}</span></a>)})}</>:""}
                        </Card.Text>
                        {/*<a href={"#"} className={'interests'}><span>Natural Language Processing,</span></a>*/}
                        {/*<a href={"#"} className={'interests'}><span>Data Science,</span></a>*/}
                        {/*<a href={"#"} className={'interests'}><span>Computer Vision,</span></a>*/}
                        {/*<a href={"#"} className={'interests'}><span>Artificial Intelligence,</span></a>*/}
                        {/*<a href={"#"} className={'interests'}><span>Deep Learning,</span></a>*/}
                        {/*<a href={"#"} className={'interests'}><span>Machine Learning</span></a>*/}
                        {/*<ListGroup className={"profile-features"}>*/}
                        {/*    <a href={"#"} className={"profile-feature"}>*/}
                        {/*        <ListGroup.Item className={"feature"}>*/}
                        {/*            <span className={"title"}>Publications </span>*/}
                        {/*            <h1>10</h1>*/}
                        {/*        </ListGroup.Item></a>*/}
                        {/*    <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>*/}
                        {/*        <span className={"title"}>Citations </span>*/}
                        {/*        <h1>10</h1>*/}
                        {/*    </ListGroup.Item></a>*/}
                        {/*    <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>*/}
                        {/*        <span className={"title"}>Co-Authors </span>*/}
                        {/*        <h1>10</h1>*/}
                        {/*    </ListGroup.Item></a>*/}
                        {/*    <a href={"#"} className={"profile-feature"}><ListGroup.Item className={"feature"}>*/}
                        {/*        <span className={"title"}>Cited Authors </span>*/}
                        {/*        <h1>10</h1>*/}
                        {/*    </ListGroup.Item></a>*/}
                        {/*</ListGroup>*/}
                        {/*<FormGroup>*/}
                        {/*    <Button variant={"primary"} className={"follow-button"}*/}
                        {/*            onClick={functionCalled}>Follow/Edit</Button>*/}
                        {/*</FormGroup>*/}
                    </Card.Body>
                </Card>
            </div>}
        </>
    );

}