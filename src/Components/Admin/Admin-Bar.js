import React, {useContext, useState} from "react";
import {Button, Collapse} from "react-bootstrap";
import AdminPersonalInformation from "./Admin-Personal-Information";
import AdminResearcherUpdate from "./Admin-Researcher-Update";
import AdminDeleteArticles from "./Admin-Delete-Articles";
import AdminAddArticle from "./Admin-Add-Article";
import AdminMetrics from "./Admin-Metrics";
import {useNavigate} from "react-router-dom";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import AdminAcceptArticle from "./Admin-Accept-Article";
import AdminDeletedArticle from "./Admin-Deleted-Article";

export default function AdminBar() {
    const context = useContext(User_Sign_In_Context);

    const navigator = useNavigate();
    const [open, setOpen] = useState(false);
    const [openArticle, setOpenArticle] = useState(false);
    const [profileOptions, setProfileOptions] = useState({
        accountSettings: true,
        add_articles: false,
        accepted_articles:false,
        remove_articles: false,
        authors_find: false,
        update_authors: false,
        stats: false,
    });
   return( <>
        <div className={"UserProfile"}>
            <div className={"profile-options"}>
                <Button
                    onClick={() => {
                        setProfileOptions({
                            accountSettings: true,
                            add_articles: false,
                            stats: false,
                            update_authors: false,
                            authors_find: false,
                            remove_articles: false,
                            accepted_articles:false,

                        })
                    }}
                >
                    Account Settings
                </Button>
                <Button onClick={() => setOpen(!open)}>
                    Author Options
                </Button>
                <Collapse in={open} >
                    <div className={"profile-detail-options profile-update-inner-buttons"}>
                        <Button
                            onClick={() => {
                                navigator("/signUp")
                            }}
                        >
                            Add Researcher
                        </Button>
                        <Button
                            onClick={() => {
                                setProfileOptions({
                                    accountSettings: false,
                                    add_articles: false,
                                    stats: false,
                                    update_authors: true,
                                    authors_find: false,
                                    remove_articles: false,
                                    accepted_articles:false,
                                })
                            }}
                        >
                            Update Researcher Status
                        </Button>
                    </div>
                </Collapse>

                <Button onClick={() => setOpenArticle(!openArticle)}>
                    Update Articles
                </Button>
                <Collapse in={openArticle} >
                    <div className={"profile-detail-options profile-update-inner-buttons"}>
                        <Button
                            onClick={() => {
                                setProfileOptions({
                                    accountSettings: false,
                                    add_articles: false,
                                    stats: false,
                                    update_authors: false,
                                    authors_find: false,
                                    remove_articles: false,
                                    accepted_articles:true,

                                })
                            }}
                        >
                            Accepted Article
                        </Button>
                        <Button
                            onClick={() => {
                                setProfileOptions({
                                    accountSettings: false,
                                    add_articles: true,
                                    stats: false,
                                    update_authors: false,
                                    authors_find: false,
                                    remove_articles: false,
                                    accepted_articles:false,


                                })
                            }}
                        >
                            Add Article
                        </Button>
                        <Button
                            onClick={() => {
                                setProfileOptions({
                                    accountSettings: false,
                                    add_articles: false,
                                    stats: false,
                                    update_authors: false,
                                    authors_find: false,
                                    remove_articles: true,
                                    accepted_articles:false,


                                })
                            }}
                        >
                            Deleted Article
                        </Button>
                    </div>
                </Collapse>

                <Button
                    onClick={() => {
                        setProfileOptions({
                            accountSettings: false,
                            add_articles: false,
                            stats: true,
                            update_authors: false,
                            authors_find: false,
                            remove_articles: false,

                        })
                    }}
                >
                    Statistics
                </Button>

                <Button
                    onClick={async () => {
                        await context.upDateStateOnLogOut();
                    }}>
                    Logout
                </Button>
            </div>

            {profileOptions.accountSettings?<AdminPersonalInformation />:""}
            {profileOptions.update_authors?<AdminResearcherUpdate />:""}
            {profileOptions.add_articles?<AdminAddArticle />:""}
            {profileOptions.accepted_articles?<AdminAcceptArticle />:""}
            {profileOptions.remove_articles?<AdminDeletedArticle />:""}
            {profileOptions.stats?<AdminMetrics />:""}

        </div>
    </>)


}