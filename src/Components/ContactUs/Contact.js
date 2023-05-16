import React, {useEffect, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import BackgroundImage from "../../Background Images/Contact-Image.png";
import {submitContactForm} from "../../Services/UserService/UserSearchService";
import {httpStatusInternalServerError, httpStatusNotFound} from "../../Services/apiConstants";
import {getTopics} from "../../Services/HomePageService/HomePageDataRetrieval";
// import BackgroundImage from "../../Background Images/Home-Background.png";
export default function Contact() {
    const BgImage = {
        backgroundImage: `url(${BackgroundImage})`,
    }
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        title: ''
    });
    const [results, setResults] = useState({
        success:false,
        emptyFields:false,
        serverError:false
    })


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        // Validate first name
        if (!formValues.firstName) {
            errors.firstName = 'Please enter your first name';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})
            isValid = false;
        }

        // Validate last name
        if (!formValues.lastName) {
            errors.lastName = 'Please enter your last name';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})

            isValid = false;
        }

        // Validate email
        if (!formValues.email) {
            errors.email = 'Please enter your email';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Please enter a valid email';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})

            isValid = false;
        }
        // Validate message
        if (!formValues.message) {
            errors.message = 'Please enter a message';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})
            isValid = false;
        }
        // Validate message
        if (!formValues.title) {
            errors.message = 'Please enter a message';
            setResults({
                success:false,
                emptyFields:true,
                serverError:false})
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Send the form data to the server
            const ObjectBody = {
                mailFrom:formValues.email,
                mailSubject:formValues.title,
                mailBody:formValues.message,
                mailNumber:formValues.phone,
                senderName:formValues.firstName +" "+ formValues.lastName
            }
            const response = await submitContactForm(ObjectBody)
            if(response===httpStatusInternalServerError)
            {
                setResults({
                    success:false,
                    emptyFields:false,
                    serverError:true})
            }
            else
            {
                setResults({
                    success:true,
                    emptyFields:false,
                    serverError:false})
            }

            console.log(formValues);
        }
    };

    return(
        <div className={'contact-form'}>
                <h2>Contact Us</h2>
                <div className={'contact-form-div'}>
                    <div className={'contact-form-div-fields'}>
                        {results.emptyFields?<Alert variant={"danger"}>Some of the Required Fields are Empty.</Alert>:null}
                        {results.success?<Alert variant={"success"}>Email Sent. We will contact you as soon as possible.</Alert>:null}
                        {results.serverError?<Alert variant={"danger"}>Un-able to send your request to admin.</Alert>:null}

                        <Form className={'form_contact'} onSubmit={handleSubmit}>
                            <Form.Group
                                controlId="formBasicName"
                                className={'contact-form-name-div'}
                            >
                                <Form.Label>TELL US ABOUT YOURSELF <span> * </span></Form.Label>
                               <Form.Group controlId="formBasicNameFields" className={'contact-form-name-fields'}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={formValues.firstName}
                                        onChange={async (e)=>{
                                            handleInputChange(e)
                                        }}
                                        name={"firstName"}
                                        required={true}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Last Name"
                                        onChange={async (e)=>{
                                                      handleInputChange(e)
                                                  }}
                                                  name={"lastName"}
                                        value={formValues.lastName}
                                        required={true}


                                    />
                               </Form.Group>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className={'contact-form-email-div'}>
                                <Form.Label>ENTER YOUR E-MAIL <span> * </span></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="e.g, someone@email.com"
                                    onChange={async (e)=>{
                                        handleInputChange(e)
                                    }}
                                    name={"email"}
                                    value={formValues.email}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className={'contact-form-email-div'}>
                                <Form.Label>ENTER SUBJECT <span> * </span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g, for telling some problem in website"
                                    onChange={async (e)=>{
                                        handleInputChange(e)
                                    }}
                                    name={"title"}
                                    value={formValues.title}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone" className={'contact-form-phone-div'}>
                                    <Form.Label>ENTER YOUR PHONE NUMBER</Form.Label>
                                <Form.Control type="text" placeholder="2356970" onChange={async (e)=>{
                                    handleInputChange(e)
                                }}
                                              name={"phone"}
                                              value={formValues.phone}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicMessage" className={'contact-form-message-div'}>
                                <Form.Label>MESSAGE <span> * </span></Form.Label>
                                <Form.Control  as="textarea" placeholder="Message" onChange={async (e)=>{
                                    handleInputChange(e)
                                }}
                                               name={"message"}
                                               value={formValues.message}
                                               required={true}

                                />
                            </Form.Group>
                            <Button type={'submit'}> Send Message </Button>
                        </Form>
                    </div>
                    <div style={BgImage} className={'contact-form-div-details'}>
                    </div>
                </div>
        </div>
    )

}
{/*<img src={process.env.PUBLIC_URL+"/BackgroundImages/Contact-Image.png"}/>*/}
