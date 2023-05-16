import React, {useState} from "react";
import BackgroundImage from "../../Background Images/Home-Background.png";
import {Form, Button, InputGroup} from "react-bootstrap";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getResults} from "../../Services/UserService/UserSearchService";
import {useNavigate} from "react-router-dom";


export default function SearchArea() {

    const navigator = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
        const OpenResearchable =async (e) => {
            e.preventDefault();
            if (searchQuery.trim().length===0) return;
            navigator(`/search/results/${searchQuery}`)
        }
        return (
            <>
                <div  className={"search-area"}>
                    <div className={"search-area-content"}>
                        <div className={"search-content"}>
                            <h1>kNowledge Verse</h1>
                            <h3>A free, AI-powered research tool for scientific literature</h3>
                            <div className={"search-form"}>
                                <Form className={"form"} >
                                        <Form.Control
                                            type="text"
                                            placeholder="Search for a paper, author, or topic"
                                            onChange={async (e)=>{await setSearchQuery(e.target.value)}}
                                            className={"search-input"}/>
                                        <Button type="submit" className={"search-button"} onClick={OpenResearchable}><FontAwesomeIcon icon={faSearchengin}/></Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
}
