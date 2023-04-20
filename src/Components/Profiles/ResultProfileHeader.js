import React, {useContext, useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Button, FormGroup} from "react-bootstrap";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {getPublisher} from "../../Services/AuthorProfileServices/PublisherDataService";

export default function ResultProfileHeader(props) {
    const {functionCalled} = props;
    const [errors, setErrors] = useState({
        serverError:false,
        notFoundError:false
    })
    const context = useContext(User_Sign_In_Context)
    const [profileObject, setProfileObject] = useState({
        affiliationLink: "",
        affiliationName:"",
        publisherEmail: "",
        publisherHIndex: 0,
        publisherHMedian: 0,
        publisherID:0,
        publisherName: "",
        publisherSite: "",
        publisherStatus: "",
        interests:[],
        names:[]
    })

    useEffect(()=>{
        async function fetchPublisher() {
            if (context.userLogIn.isPublisher) {
                const response = await getPublisher({"userID": context.userLogIn.user_id})
                if (response === "Not Found") {
                    await setErrors({...errors, notFoundError: true})
                } else if (response === "Error") {
                    await setErrors({...errors, serverError: true})
                } else {
                    await setProfileObject({
                        affiliationLink: response.Publisher.affiliationLink,
                        affiliationName:response.Publisher.affiliationName,
                        publisherEmail: response.Publisher.publisherEmail,
                        publisherHIndex: response.Publisher.publisherHIndex,
                        publisherHMedian: response.Publisher.publisherHMedian,
                        publisherID:response.Publisher.publisherID,
                        publisherName: response.Publisher.publisherName,
                        publisherSite: response.Publisher.publisherSite,
                        publisherStatus: response.Publisher.publisherStatus,
                        interests: response.AreaofInterests,
                        names: response.AuthorNames,

                    }
                    )
                    console.log("Retrieved Data is: ", response)
                }
            }
        }
        fetchPublisher().then();
    }, [])

    return (
        <>
            {<div className={"profile_div"}>
                <Card className={"Card_Div"}>
                    <Card.Img src={process.env.PUBLIC_URL + "/Images/Profile_Images/download.png"}
                              className={"Profile_Image"} alt={"profile_image"}/>
                    <Card.Body clssName={"Card-Body"}>
                        <Card.Title className={"text-area"}>
                            {profileObject.publisherName}
                        </Card.Title>
                        <Card.Subtitle className={"text-muted text-area"}>
                            <Card.Text>
                                {profileObject.names.join(", ")}
                            </Card.Text>
                        </Card.Subtitle>
                        <Card.Text className={"text-area"}>
                            <b> Email: </b> {profileObject.publisherEmail}
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            <b> Affiliation: </b> {profileObject.affiliationName}
                        </Card.Text>
                        <Card.Text className={"text-area"}>
                            <b>Research Areas:</b>
                            {
                                profileObject.interests.map((value)=>{
                                    return(<a href={"#"} className={'interests'}><span>{value}</span></a>)
                                })
                            }
                            {/*<a href={"#"} className={'interests'}><span>Natural Language Processing,</span></a>*/}
                            {/*<a href={"#"} className={'interests'}><span>Data Science,</span></a>*/}
                            {/*<a href={"#"} className={'interests'}><span>Computer Vision,</span></a>*/}
                            {/*<a href={"#"} className={'interests'}><span>Artificial Intelligence,</span></a>*/}
                            {/*<a href={"#"} className={'interests'}><span>Deep Learning,</span></a>*/}
                            {/*<a href={"#"} className={'interests'}><span>Machine Learning</span></a>*/}
                        </Card.Text>
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