import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import {faGoogle, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form} from "react-bootstrap";

// import {fab icon}
function SignIn() {

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom sing-in-form">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign Up with</p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <FontAwesomeIcon icon={faGoogle}/>
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a'  className='me-2'>
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a'  className='me-2'>
                            <FontAwesomeIcon icon={faTwitter}/>

                        </MDBBtn>

                    </div>

                    <div className="divider d-flex align-items-center my-2">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    {/*<MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" required={"true"}/>*/}
                    {/*<MDBInput wrapperClass='mb-1' label='Password' id='formControlLg' type='password' size="lg"/>*/}
                    {/*<MDBInput wrapperClass='mb-1' label='Confirm Password' id='formControlLg' type='password' size="lg"/>*/}
                    <Form>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>

                    </Form>

                    <div className='text-center text-md-start  pt-2'>
                        <Button className="mb-0 px-5" size='lg'>Sign Up</Button>
                    </div>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default SignIn;