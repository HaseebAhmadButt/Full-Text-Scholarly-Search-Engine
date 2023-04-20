import {Alert, Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {changePassword} from "../../Services/AuthenticationService/LogInSignUpService";
import {useNavigate} from "react-router-dom";
import {EmailVarificationRegex} from "../../Services/apiConstants"

const  ForgotPassword= ()=>{

    const navigator = useNavigate();
    const [formValues, setFormValues] = useState({
        email:"",
        newPassword:"",
        newConfirmPassword:""
    });

    const [errors, setErrors] = useState({
        incorrectEmail: false,
        emailRequired:false,
        passwordLength:false,
        passwordRequired:false,
        passwordDifferent:false,
        confirmRequired:false,
        serverError:false,
        emailNotFound:false
    });

    const [success, setSuccess] = useState(false)

    const changeFormState = async (e)=>{
        const fieldName = e.target.name;
        await setFormValues(prevState => ({...prevState, [fieldName]:e.target.value}))
    }

    console.log(formValues)
    console.log("Errors values", errors)

    const submitForm = async (e)=>{
        e.preventDefault();
        let error = {
            incorrectEmail: false,
            emailRequired:false,
            passwordLength:false,
            passwordRequired:false,
            passwordDifferent:false,
            confirmRequired:false,
            serverError:false,
            emailNotFound:false
        };

        await setErrors(error)

        if (formValues.email === "") {
            error.emailRequired = true
        } else {
            if (!EmailVarificationRegex.test(formValues.email)) {
                error.incorrectEmail = true;
            }
        }
        if (formValues.newPassword === "") {
            console.log("inside Password checker")
            error.passwordRequired = true
        } else {
            if (formValues.newPassword.length < 8) {
                error.passwordLength = true;
            }

        }
        if (formValues.newConfirmPassword === "") {
            error.confirmRequired = true
        } else {
            if (formValues.newPassword !== formValues.newConfirmPassword) {
                error.passwordDifferent = true
            }
        }
        await setErrors(prevState =>({...prevState, ...error}))
        if (!error.emailRequired && !error.incorrectEmail && !error.passwordRequired && !error.passwordLength && !error.confirmRequired && !error.passwordDifferent)
        {
            console.log("fetching from server")
            const sha1 = require("sha1")
            const password = sha1(formValues.newPassword)
            const data = {
                "Email": `${formValues.email}`,
                "Password": `${password}`
            }

            try {
                const response = await changePassword(data)
                if (response==="Not Found"){
                    setErrors({...errors, emailNotFound: true})
                }
                else{
                await setSuccess(true)
                setTimeout(()=>{
                    navigator("/signIn")
                }, 2000)}
            }
            catch (error){
                setErrors({...errors, serverError: true})
            }
        }


    }


    return (
                <div className={"sign-up-page"}>
                    <div className={"ImageDiv"}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt={"Sign Up Logo"}/>
                    </div>
                    <div className={"Sign_Up_Form"}>
                        {errors.serverError?<h5>Error in Creating Account</h5>:""}
                        {errors.emailRequired?<Alert variant={'danger'}>E-Mail Required</Alert>:""}
                        {errors.passwordRequired?<Alert variant={'danger'}>Password is Empty</Alert>:""}
                        {errors.incorrectEmail?<Alert variant={'danger'}>Incorrect E-Mail</Alert>:""}
                        {errors.passwordLength?<Alert variant={'danger'}>Password should be at least of 8 characters</Alert>:""}
                        {errors.emailNotFound?<Alert variant={'danger'}>E-Mail Not Found</Alert>:""}
                        {errors.confirmRequired?<Alert variant={'danger'}>Retype Password Field is Empty</Alert>:""}
                        {errors.passwordDifferent?<Alert variant={'danger'}>Password fields are not same.</Alert>:""}
                        {success?<Alert variant={'success'}>Password Changed Successfully.</Alert>:""}
                        <Form
                            onSubmit={submitForm}
                        >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>
                                    Email address
                                    <span className={"important-star"}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={async (e)=>{await changeFormState(e)}}
                                    value={formValues.email}
                                    name={'email'}
                                    placeholder="Enter Email" />
                            </Form.Group>
                            <br/>
                            <Form.Group  controlId="formBasicPassword">
                                <Form.Label>
                                    New Password
                                    <span className={"important-star"}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={async (e)=>{await changeFormState(e)}}
                                    value={formValues.newPassword}
                                    name={'newPassword'}/>
                            </Form.Group>
                            <br/>
                            <Form.Group  controlId="formConfirmPassword">
                                <Form.Label>
                                    Repeat New Password
                                    <span className={"important-star"}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={async (e)=>{await changeFormState(e)}}
                                    value={formValues.newConfirmPassword}
                                    name={'newConfirmPassword'}/>
                            </Form.Group>
                            <br/>
                            <div className='sign-up-button-div'>
                                <Button type={"submit"} className="button">Change Password</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            );
}

export default ForgotPassword;