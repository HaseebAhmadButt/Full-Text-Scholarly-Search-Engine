import {Alert, Button, CloseButton, Form} from "react-bootstrap";
import React, {useState, useContext} from "react";
import {createSimplePublisher, createPartialPublisher, createPublisherProfile} from '../../../Services/AuthorProfileServices/PublisherFormSubmissionService'
import User_Sign_In_Context from "../../../Contexts/Context/User_Sign_In_Context";

export default function UpdateResearcherInformation() {
    const context = useContext(User_Sign_In_Context)
    const [formValues, setFormValues] = useState({
        fullName: "",
        professionalEmail: "",
        affiliation: "",
        affiliationLink: "",
        personalSiteLink: "",
        authorName:"",
        authorInterest:""
    });
    const [alerts, setAlerts] = useState({
        success:false,
        serverError:false,
        emptyFields:false,
        emailConflict:false
    })
    const updateFormValues = async (e) =>{
        const fieldName = e.target.name;
        await setFormValues({...formValues, [fieldName]:e.target.value})
    }
    const [authorName, setAuthorNames] = useState([]);
    const [Interests, setInterests] = useState([]);
    const addAuthorName = async () => {
        if(formValues.authorName.trim().length > 0) {
            if(authorName.includes(formValues.authorName)) {
                await setFormValues((prev) => ({...prev, authorName: ""}))

            }
            else{
                await setAuthorNames((prev) => [...prev, formValues.authorName]);
                setFormValues((prev) => ({...prev, authorName: ""}))
            }
        }
    }
    const addInterests = async () => {
        if(formValues.authorInterest.trim().length > 0) {
            if(Interests.includes(formValues.authorInterest)) {
                await setFormValues((prev) => ({...prev, authorInterest: ""}))
            }
            else{
                await setInterests((prev) => [...prev, formValues.authorInterest]);
                setFormValues((prev) => ({...prev, authorInterest: ""}))
            }
        }
    }

    const displayAuthorNames = authorName.map((author, index) => {
        return (
            <span className={'tags form-tag'}>{author} <CloseButton onClick={()=>{
                removeAuthorNames(index)}} className={"close-button"}/></span>
        )
    })
    const removeAuthorNames = (index) => {
        setAuthorNames((prev) => prev.filter((_, i) => i !== index));
    }
    const displayInterest = Interests.map((Journal, index) => {
        return (
            <span className={'tags form-tag'}>{Journal} <CloseButton onClick={()=>{
                removeInterests(index)}} className={"close-button"}/></span>
        )
    })
    const removeInterests = (index) => {
        setInterests((prev) => prev.filter((_, i) => i !== index));
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let Object = {
            success:false,
            serverError:false,
            emptyFields:false,
            emailConflict:false
        }
        if(formValues.fullName.trim() === ''
        && formValues.professionalEmail.trim() === '')
        {
            Object.emptyFields = true
            setAlerts(Object)
        }
            const data = {
                email: `${formValues.professionalEmail}`,
                name: `${formValues.fullName}`,
                personalLink: `${formValues.personalSiteLink}`,
                affiliationName: `${formValues.affiliation}`,
                affiliationLink: `${formValues.affiliationLink}`,
                authorNames: authorName,
                areasOfInterest: Interests,
                userID: context.userLogIn.user_id
            }

                const response = await createPublisherProfile(data)
                if(response === 409){ Object.emailConflict= true; await setAlerts(Object)}
                else if(response === 500){ Object.serverError = true;await setAlerts(Object)}
                else{
                        Object.success= true; await setAlerts(Object)
                        await context.updatePublisherField(true);
                        await context.upDataPublisher({
                            publisherEmail: response.publisherEmail,
                            publisherName: response.publisherName,
                            publisherSite: response.publisherSite,
                            affiliationName: response.affiliationName,
                            affiliationLink: response.affiliationLink,
                            names: authorName,
                            interests: Interests,
                            userID: context.userLogIn.user_id,
                            publisherHIndex: 0,
                            publisherHMedian:0,
                            publisherID:response.publisherID,
                            publisherStatus:response.publisherStatus,

                        })
                    }

    }
    return (
        <>
        <Form className={"personal-profile-update-form"} onSubmit={handleFormSubmit}>
            <h2>Researcher Information</h2>
            {alerts.success?<Alert variant={"success"}>Publisher Account Updated Successfully</Alert>:""}
            {alerts.serverError?<Alert variant={"danger"}>Server Error, can't update/create account right now.</Alert>:""}
            {alerts.emptyFields?<Alert variant={"danger"}>Required Fields are Empty.</Alert>:""}
            {alerts.emailConflict?<Alert variant={"danger"}>E-Mail already exists.</Alert>:""}
            <Form.Group controlId="UserSearch" className={"personal-profile-update-fields"}>
                <Form.Label>
                    Name <span className={"important-star"}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Full name as it appears on your articles"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"fullName"}
                    value={formValues.fullName}
                />
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Add other names
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add other names you have published"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"authorName"}
                    value={formValues.authorName}
                />
                <Button variant={"primary"} className={"personal-profile-update-button"}
                    onClick={addAuthorName}
                >Add</Button>
                <div style={{clear:"right"}}></div>
                <div className={"tags-dive"}>
                    {displayAuthorNames}
                </div>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    E-Mail for Verification <span className={"important-star"}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="somename@affiliation.edu.pk"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"professionalEmail"}
                    value={formValues.professionalEmail}
                />
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Areas of Interest
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Add areas you have worked in"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"authorInterest"}
                    value={formValues.authorInterest}
                />
                <Button variant={"primary"} className={"personal-profile-update-button"} onClick={addInterests}>Add</Button>
                <div style={{clear:"right"}}></div>
                <div className={"tags-dive"}>
                    {displayInterest}
                </div>
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="National University of Science and Technology"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"affiliation"}
                    value={formValues.affiliation}

                />
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Affiliation Homepage
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="https://nust.edu.pk"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"affiliationLink"}
                    value={formValues.affiliationLink}
                />
            </Form.Group>
            <Form.Group controlId="UserSearch"  className={"personal-profile-update-fields"}>
                <Form.Label>
                    Personal Site
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="https://somewebsite.com"
                    className={"middle-search-input profile-input"}
                    onChange={async (e)=>{await updateFormValues(e)}}
                    name={"personalSiteLink"}
                    value={formValues.personalSiteLink}
                />
            </Form.Group>
            <Button type={"submit"} variant={"primary"} className={"researcher-profile-update-main-button"}>Update</Button>
        </Form>
        </>
    )
}