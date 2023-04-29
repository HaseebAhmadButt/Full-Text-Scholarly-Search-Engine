import React, {useState, useContext} from "react";
import UpdateResearcherInformation from "./UpdateResearcherInformation";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import Metrics from "./Matrics";
import ProfileArticles from "./ProfileArticles";
import SavedArticles from "./Saved Articles";
import ProfileResults from "../ProfileResults";
import {Button, Collapse, Offcanvas} from "react-bootstrap";
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";

export default function PersonalProfile() {

    const context = useContext(User_Sign_In_Context);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const [profileOptions, setProfileOptions] = useState({
        profileResults: context.userLogIn.isPublisher && context.userLogIn.publisherStatus,
        accountSettings: !context.userLogIn.isPublisher || !context.userLogIn.publisherStatus,
        researcherProfile: false,
        articles: false,
        metrics: false,
        savedArticles: false,
    });
    const handleButtonClick = (profileOption) => {
        setProfileOptions({
            profileResults: profileOption === "profileResults",
            accountSettings: profileOption === "accountSettings",
            researcherProfile: profileOption === "researcherProfile",
            articles: profileOption === "articles",
            metrics: profileOption === "metrics",
            savedArticles: profileOption === "savedArticles",
        });
    }

    return (
        <>
            <div className={"UserProfile"}>
                <div className={"profile-options"}>
                    <Button
                        className={context.userLogIn.isPublisher && context.userLogIn.publisherStatus?"":"disabled_link"}
                        onClick={() => {
                            handleButtonClick("profileResults")
                        }}
                    >
                        Profile
                    </Button>
                    <Button onClick={() => handleButtonClick("accountSettings")}>
                        Account Settings
                    </Button>
                    <Button
                        className={context.userLogIn.publisherStatus?"":"disabled_link"}

                        onClick={() => setOpen(!open)}>
                        Researcher Profile
                    </Button>
                    <Collapse in={open} >
                        <div className={"profile-detail-options profile-update-inner-buttons"}>
                            <Button
                                className={context.userLogIn.publisherStatus?"":"disabled_link"}
                                onClick={() => handleButtonClick("researcherProfile")}>
                                Researcher Information
                            </Button>
                            <Button
                                className={context.userLogIn.isPublisher && context.userLogIn.publisherStatus?"simple":"disabled_link"}
                                onClick={() => handleButtonClick("articles")}>
                                Articles
                            </Button>
                        </div>
                    </Collapse>
                    {/*<Button*/}
                    {/*    className={context.userLogIn.isPublisher?"simple":"disabled_link"}*/}
                    {/*    onClick={() => handleButtonClick("metrics")}*/}
                    {/*>*/}
                    {/*    Profile Metrics*/}
                    {/*</Button>*/}
                    <Button
                        onClick={() => handleButtonClick("savedArticles")}
                    >
                        Saved Articles
                    </Button>
                    <Button
                        onClick={async () =>{
                            await context.upDateStateOnLogOut();
                            await context.upDatePublisherOnLogOut();
                        }}
                    >
                        Logout
                    </Button>


                    {/*
                        Below code is for enabling Drawer on smaller Screens

                    */}


                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Profile Options</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body

                            className={"profile-options profile-mobile-options"}>
                            <Button
                                className={context.userLogIn.isPublisher && context.userLogIn.publisherStatus?"":"disabled_link"}
                                onClick={() => {
                                    handleButtonClick("profileResults")
                                }}
                            >
                                Profile
                            </Button>
                            <Button onClick={() => handleButtonClick("accountSettings")}>
                                Account Settings
                            </Button>
                            <Button onClick={() => setOpen(!open)}>
                                Researcher Profile
                            </Button>
                            <Collapse in={open} >
                                <div className={"profile-detail-options profile-update-inner-buttons"}>
                                    <Button onClick={() => handleButtonClick("researcherProfile")}>
                                        Researcher Information
                                    </Button>
                                    <Button
                                        className={context.userLogIn.isPublisher && context.userLogIn.publisherStatus?"":"disabled_link"}
                                        onClick={() => handleButtonClick("articles")}>
                                        Articles
                                    </Button>
                                </div>
                            </Collapse>
                            <Button
                                className={context.userLogIn.isPublisher && context.userLogIn.publisherStatus?"":"disabled_link"}
                                onClick={() => handleButtonClick("metrics")}
                            >
                                Profile Metrics
                            </Button>
                            <Button
                                onClick={() => handleButtonClick("savedArticles")}
                            >
                                Saved Articles
                            </Button>
                            <Button>
                                Logout
                            </Button>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                {profileOptions.accountSettings?<UpdatePersonalInformation/>:""}
                {profileOptions.researcherProfile?<UpdateResearcherInformation/>:""}
                {profileOptions.articles?<ProfileArticles/>:""}
                {/*{profileOptions.metrics?<Metrics/>:""}*/}
                {profileOptions.savedArticles?<SavedArticles />:""}
                {profileOptions.profileResults?<ProfileResults settings={handleShow}/>:""}
            </div>
        </>
    )
}