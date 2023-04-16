import React, {useState} from 'react';
// import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
// import {faGoogle, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form} from "react-bootstrap";
import {UserSignUp} from '../../Services/LogInSignUpService';
import "../../Styles/Common/Sign_Up.css";
import {useNavigate} from "react-router-dom";
// import {useConst} from "@chakra-ui/react";
import {EmailVarificationRegex} from "../../Services/apiConstants"

// import {fab icon}
function SignIn() {
    const navigator = useNavigate();
    const [formValues, setFormValues] = useState({
            email:"",
            name:"",
            password:"",
            confirmPassword:""
        });
    const [errors, setErrors] = useState({
            incorrectEmail: false,
            passwordDifferent:false,
            emailRequired:false,
            nameRequired:false,
            passwordRequired:false,
            confirmRequired:false,
            passwordLength:false,
        });
    const [emailExistsError, setEmailExistsError] = useState(false)
    const [serverError, setserverError] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault();
        let error = {
            incorrectEmail: false,
            passwordDifferent: false,
            emailRequired: false,
            nameRequired: false,
            passwordRequired: false,
            confirmRequired: false,
            passwordLength: false
        };

        if (formValues.email === "") {
            error.emailRequired = true
        } else {
            if (!EmailVarificationRegex.test(formValues.email)) {
                error.incorrectEmail = true;
            }
        }
        if (formValues.name === "") {
            error.nameRequired = true
        }
        if (formValues.password === "") {
            error.passwordRequired = true
        } else {
            if (formValues.password.length < 8) {
                error.passwordLength = true;
            }

        }
        if (formValues.confirmPassword === "") {
            error.confirmRequired = true
        } else {
            if (formValues.password !== formValues.confirmPassword) {
                error.passwordDifferent = true
            }
        }
        setErrors(error)
        if (!errors.emailRequired && !errors.incorrectEmail && !errors.nameRequired && !errors.passwordRequired && !errors.passwordLength && !errors.confirmRequired && !errors.passwordDifferent) {
            const sha1 = require("sha1")
            const password = sha1(formValues.password)
            const data = {
                "Email": `${formValues.email}`,
                "Name": `${formValues.name}`,
                "Password": `${password}`
            }

            try {
                const response = await UserSignUp(data);
                if(response === "E-Mail Already Exists"){
                    setEmailExistsError(true);
                }
                else {
                    setTimeout(() => {
                        navigator("/signIn");
                    }, 2000);
                }

            } catch (error) {
                setserverError(true)
            }
        }

    }
    return (<div className={"sign-up-page"}>
        <div className={"ImageDiv"}>
             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt={"Sign Up Logo"}/>

        </div>
        <div className={"Sign_Up_Form"}>
            {serverError?<h5>Error in Creating Account</h5>:""}
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                                Email address
                                <span className={"important-star"}>*</span>
                                &nbsp;&nbsp;&nbsp; {errors.emailRequired? <span className={"Error-Message"}>E-Mail is Required</span>:""}
                                &nbsp;&nbsp;&nbsp; {errors.incorrectEmail? <span className={"Error-Message"}>In-Correct E-Mail</span>:""}
                            </Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e)=>{setFormValues(
                                    prevState => ({...prevState, email: e.target.value}))}}
                                value={formValues.email}
                                name={'email'}
                                placeholder="Enter Email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>
                                Name
                                <span className={"important-star"}>*</span>
                                &nbsp;&nbsp;&nbsp; {errors.nameRequired? <span className={"Error-Message"}>Name is Required</span>:""}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e)=>{setFormValues(prevState => ({...prevState, name: e.target.value}))}}
                                value={formValues.name}
                                name={'name'}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group  controlId="formBasicPassword">
                            <Form.Label>
                                Password
                                <span className={"important-star"}>*</span>
                                &nbsp;&nbsp;&nbsp; {errors.passwordRequired? <span className={"Error-Message"}>Password is Required</span>:""}
                                &nbsp;&nbsp;&nbsp; {errors.passwordLength? <span className={"Error-Message"}>Password should of at least 8 characters</span>:""}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                onChange={(e)=>{setFormValues(prevState => ({...prevState, password: e.target.value}))}}
                                value={formValues.password}
                                name={'password'}/>
                        </Form.Group>
                        <br/>
                        <Form.Group  controlId="formConfirmPassword">
                            <Form.Label>
                                Confirm Password
                                <span className={"important-star"}>*</span>
                                &nbsp;&nbsp;&nbsp; {errors.confirmRequired? <span className={"Error-Message"}>Password is Required</span>:""}
                                &nbsp;&nbsp;&nbsp; {errors.passwordDifferent? <span className={"Error-Message"}>Password did not match</span>:""}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e)=>{setFormValues(prevState => ({...prevState, confirmPassword: e.target.value}))}}
                                value={formValues.confirmPassword}
                                name={'confirmPassword'}/>
                        </Form.Group>
                        {emailExistsError?<span className={'email-exists-error'}>E-Mail Already Exists</span>:""}
                        <br/>
                        <div className='sign-up-button-div'>
                            <Button type={"submit"} className="">Sign Up</Button>
                        </div>
                    </Form>


        </div>
    </div>);
}

export default SignIn;