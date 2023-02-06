import React from "react";
import {Button, Form} from "react-bootstrap";
import BackgroundImage from "../../Background Images/Contact-Image.png";
// import BackgroundImage from "../../Background Images/Home-Background.png";
export default function Contact() {
    const BgImage = {
        backgroundImage: `url(${BackgroundImage})`,
    }
    return(
        <div className={'contact-form'}>
                <h2>Contact Us</h2>
                <div className={'contact-form-div'}>
                    <div className={'contact-form-div-fields'}>
                        <Form className={'form_contact'}>
                            <Form.Group controlId="formBasicName" className={'contact-form-name-div'}>
                                <Form.Label>TELL US ABOUT YOURSELF <span> * </span></Form.Label>
                               <Form.Group controlId="formBasicNameFields" className={'contact-form-name-fields'}>
                                    <Form.Control type="text" placeholder="Enter First Name" />
                                    <Form.Control type="text" placeholder="Enter Last Name" />
                               </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className={'contact-form-email-div'}>
                                <Form.Label>ENTER YOUR E-MAIL <span> * </span></Form.Label>
                                <Form.Control type="email" placeholder="e.g, someone@email.com" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone" className={'contact-form-phone-div'}>
                                    <Form.Label>ENTER YOUR PHONE NUMBER</Form.Label>
                                <Form.Control type="text" placeholder="2356970" />
                            </Form.Group>
                            <Form.Group controlId="formBasicMessage" className={'contact-form-message-div'}>
                                <Form.Label>MESSAGE <span> * </span></Form.Label>
                                <Form.Control  as="textarea" placeholder="Message" />
                            </Form.Group>
                            <Button type={'submit'}> Send Message </Button>

                        </Form>
                    </div>
                    <div style={BgImage} className={'contact-form-div-details'}>
                        {/*<img src={process.env.PUBLIC_URL+"/BackgroundImages/Contact-Image.png"}/>*/}
                    </div>
                </div>
        </div>
    )

}