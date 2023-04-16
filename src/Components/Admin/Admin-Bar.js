import React, {useState} from "react";
import {Button, Collapse} from "react-bootstrap";
import AdminPersonalInformation from "./Admin-Personal-Information";
import AdminResearcherUpdate from "./Admin-Researcher-Update";
import AdminDeleteArticles from "./Admin-Delete-Articles";
import AdminAddArticle from "./Admin-Add-Article";
import AdminMetrics from "./Admin-Metrics";
import {useNavigate} from "react-router-dom";

export default function AdminBar() {
    const navigator = useNavigate();
    const [open, setOpen] = useState(false);
    const [openArticle, setOpenArticle] = useState(false);
    const [profileOptions, setProfileOptions] = useState({
        accountSettings: true,
        add_articles: false,
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
                                    add_articles: true,
                                    stats: false,
                                    update_authors: false,
                                    authors_find: false,
                                    remove_articles: false,

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

                                })
                            }}
                        >
                            Delete Article
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
                    onClick={() => {
                        alert("Logout");
                    }}>
                    Logout
                </Button>
            </div>

            {profileOptions.accountSettings?<AdminPersonalInformation />:""}
            {profileOptions.update_authors?<AdminResearcherUpdate />:""}
            {profileOptions.add_articles?<AdminAddArticle />:""}
            {profileOptions.remove_articles?<AdminDeleteArticles />:""}
            {profileOptions.stats?<AdminMetrics />:""}

        </div>
    </>)


}