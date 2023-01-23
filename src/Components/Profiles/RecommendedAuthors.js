import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import React from "react";

export default function AuthorRecommendations() {
    return (
            <div className={"recommendation-card-div"}>
                <Card>
                    <Card.Body>
                        <Card.Img src={process.env.PUBLIC_URL+"/Images/Profile_Images/download.png"} className={"Profile_Image recommendation-author-profile"}/>
                        <Card.Title >Name of Author</Card.Title>
                        <ul className={"recommendation-list-features"}>
                            <li><h6>Publications </h6>
                                <h6>10</h6></li>
                            <li><h6>Citations </h6>
                                <h6>10</h6></li>
                        </ul>
                        <Button variant={"primary"} className={"visit-profile-button"}>View Profile</Button>
                    </Card.Body>
                </Card>
            </div>
    )
}