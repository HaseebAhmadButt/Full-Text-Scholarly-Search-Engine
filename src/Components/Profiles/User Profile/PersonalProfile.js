import React, {useState} from "react";
import UpdateResearcherInformation from "./UpdateResearcherInformation";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import ProfileArticles from "./ProfileArticles";
// import ProfileOptions from "./UserProfileOptions";
import {Button, Collapse} from "react-bootstrap";
// import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function PersonalProfile() {
    const [open, setOpen] = useState(false);
    const [profileOptions, setProfileOptions] = useState({
        accountSettings: true,
        researcherProfile: false,
        articles: false,
    });

    return (
        <>
            <div className={"UserProfile"}>
                <div className={"profile-options"}>
                    <Button
                        onClick={() => {
                                setProfileOptions({
                                    accountSettings: true,
                                    researcherProfile: false,
                                    articles: false,
                            })
                        }}
                    >
                        Account Settings
                    </Button>
                    <Button onClick={() => setOpen(!open)}>
                        Researcher Profile
                        {/*<FontAwesomeIcon icon={faArrowDown} className={"downarraow"}/>*/}
                    </Button>
                    <Collapse in={open} >
                        <div className={"profile-detail-options profile-update-inner-buttons"}>
                            <Button
                                onClick={() => {
                                    setProfileOptions({
                                        accountSettings: false,
                                        researcherProfile: true,
                                        articles: false,
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
                                    })
                                }}
                            >
                                Articles
                            </Button>
                        </div>
                    </Collapse>
                    <Button>
                        Profile Metrics
                    </Button>
                    <Button>
                        Saved Articles
                    </Button>
                    <hr />
                    <Button>
                        Logout
                    </Button>
                </div>


                {profileOptions.accountSettings?<UpdatePersonalInformation/>:""}
                {profileOptions.researcherProfile?<UpdateResearcherInformation/>:""}
                {profileOptions.articles?<ProfileArticles/>:""}
            </div>
        </>
    )
}