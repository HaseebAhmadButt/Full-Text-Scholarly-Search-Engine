import React, {useState} from "react";
import UpdateResearcherInformation from "./UpdateResearcherInformation";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import Metrics from "./Matrics";
import ProfileArticles from "./ProfileArticles";
import SavedArticles from "./Saved Articles";
import ProfileResults from "../ProfileResults";
import {Button, Collapse, Form, Offcanvas} from "react-bootstrap";

export default function PersonalProfile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const [profileOptions, setProfileOptions] = useState({
        profileResults: true,
        accountSettings: false,
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
                    <Button onClick={() => {
                            handleButtonClick("profileResults")
                        }}>
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
                            <Button onClick={() => handleButtonClick("articles")}>
                                Articles
                            </Button>
                        </div>
                    </Collapse>
                    <Button
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


                    {/*
                        Below code is for enabling Drawer on smaller Screens

                    */}
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Profile Options</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className={"profile-options profile-mobile-options"}>
                            <Button
                                onClick={() => {
                                    setProfileOptions({
                                        profileResults: true,
                                        accountSettings: false,
                                        researcherProfile: false,
                                        articles: false,
                                        metrics: false,
                                        savedArticles: false,
                                    })
                                }}
                            >
                                Profile
                            </Button>
                            <Button
                                onClick={() => {
                                    setProfileOptions({
                                        accountSettings: true,
                                        researcherProfile: false,
                                        articles: false,
                                        metrics: false,
                                        savedArticles: false,
                                        profileResults: false,

                                    })
                                }}
                            >
                                Account Settings
                            </Button>
                            <Button onClick={() => setOpen(!open)}>
                                Researcher Profile
                            </Button>
                            <Collapse in={open} >
                                <div className={"profile-detail-options profile-update-inner-buttons"}>
                                    <Button
                                        onClick={() => {
                                            setProfileOptions({
                                                accountSettings: false,
                                                researcherProfile: true,
                                                articles: false,
                                                metrics: false,
                                                savedArticles: false,
                                                profileResults: false,

                                            })
                                        }}
                                    >
                                        Researcher Information
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setProfileOptions({
                                                accountSettings: false,
                                                researcherProfile: false,
                                                articles: true,
                                                metrics: false,
                                                savedArticles:  false,
                                                profileResults: false,

                                            })
                                        }}
                                    >
                                        Articles
                                    </Button>
                                </div>
                            </Collapse>
                            <Button
                                onClick={() => {
                                    setProfileOptions({
                                        accountSettings: false,
                                        researcherProfile: false,
                                        articles: false,
                                        metrics: true,
                                        savedArticles: false,
                                        profileResults: false,

                                    })
                                }}>
                                Profile Metrics
                            </Button>
                            <Button
                                onClick={() => {
                                    setProfileOptions({
                                        accountSettings: false,
                                        researcherProfile: false,
                                        articles: false,
                                        metrics: false,
                                        savedArticles: true,
                                        profileResults: false,

                                    })
                                }}
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
                {profileOptions.metrics?<Metrics/>:""}
                {profileOptions.savedArticles?<SavedArticles />:""}
                {profileOptions.profileResults?<ProfileResults settings={handleShow}/>:""}
            </div>
        </>
    )
}