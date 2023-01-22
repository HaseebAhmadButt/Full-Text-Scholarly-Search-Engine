import React from "react";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
export default function ResultsShowingSearchRecommendation() {
    return(
        <>
            <div className={"author-recommendations"}>
                <h3>Author Recommendations</h3>
            <div className={"recommendation-div"}>
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
            </div>
            </div>
        </>
    )
}