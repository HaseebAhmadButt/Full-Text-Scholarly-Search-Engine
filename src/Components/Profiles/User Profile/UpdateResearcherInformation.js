import {Button, CloseButton, Form} from "react-bootstrap";
import React, {useState} from "react";

export default function UpdateResearcherInformation() {

    const [formValues, setFormValues] = useState({
        fullName: "",
        professionalEmail: "",
        affiliation: "",
        affiliationLink: "",
        personalSiteLink: ""
    });

    const asy



    const [Authors, setAuthors] = useState([]);
    const [Interests, setInterests] = useState([]);
    // const addAuthor = () => {
    //     // if(formValues.advance_author.length > 0) {
    //         setAuthors((prev) => [...prev, formValues.advance_author]);
    //         // setFormValues((prev) => ({...prev, advance_author: ""}))
    //     // }
    // }
    // const addJournals = () => {
    //     // if(formValues.advance_journal.length > 0) {
    //         setInterests((prev) => [...prev, formValues.advance_journal]);
    //         // setFormValues((prev) => ({...prev, advance_journal: ""}))
    //     // }
    // }
    // const displayAuthors = Authors.map((author, index) => {
    //     return (
    //         <span className={'tags form-tag'}>{author} <CloseButton onClick={()=>{
    //             removeAuthor(index)}} className={"close-button"}/></span>
    //     )
    // })
    // const removeAuthor = (index) => {
    //     setAuthors((prev) => prev.filter((_, i) => i !== index));
    // }
    // const displayJournals = Journals.map((Journal, index) => {
    //     return (
    //         <span className={'tags form-tag'}>{Journal} <CloseButton onClick={()=>{
    //             removeJournals(index)}} className={"close-button"}/></span>
    //     )
    // })
    // const removeJournals = (index) => {
    //     setJournals((prev) => prev.filter((_, i) => i !== index));
    // }
    return (
        <>
        <Form className={"personal-profile-update-form"}>
            <h2>Researcher Information</h2>
            <Form.Group controlId="UserSearch" className={"personal-profile-update-fields"}>
                <Form.Label>
                    Name <span className={"important-star"}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Full name as it appears on your articles"
                    className={"middle-search-input profile-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Add other names
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add other names you have published"
                    className={"middle-search-input profile-input"}/>
                <Button variant={"primary"} className={"personal-profile-update-button"}>Add</Button>
                <div style={{clear:"right"}}></div>
                <div className={"tags-dive"}>
                    {/*{displayAuthors}*/}
                </div>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    E-Mail for Verification <span className={"important-star"}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input profile-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Areas of Interest
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add other names you have published"
                    className={"middle-search-input profile-input"}/>
                <Button variant={"primary"} className={"personal-profile-update-button"}>Add</Button>
                <div style={{clear:"right"}}></div>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input profile-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation Homepage
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input profile-input"}/>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Personal Site
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Professor of Physics, Princeton University"
                    className={"middle-search-input profile-input"}/>
            </Form.Group>
            <Button type={"submit"} variant={"primary"} className={"researcher-profile-update-main-button"}>Update</Button>
        </Form>
        </>
    )
}