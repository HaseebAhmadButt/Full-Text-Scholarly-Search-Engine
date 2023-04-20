import React, {useContext, useState} from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBInput} from 'mdb-react-ui-kit';
import {Button, Alert, Form} from "react-bootstrap";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import {UserLogIn} from "../../Services/AuthenticationService/LogInSignUpService";
import {useNavigate} from "react-router-dom";
import {EmailVarificationRegex} from "../../Services/apiConstants"
function SignIn() {
    const navigator = useNavigate();
    const context = useContext(User_Sign_In_Context)

    const [logInfo, setLogInfo] = useState({Email:"",Password:""})
    const [error, setError] = useState({
            emailNotFound:false,
            emailRequired: false,
            incorrectEmail:false,
            passwordRequired: false,
            incompletePassword:false
        })
    const [serverError, setServerError] = useState(false)
    const changeFormState = async (e)=>{
        const fieldName = e.target.name;
        await setLogInfo(prevState => ({...prevState, [fieldName]:e.target.value}))
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        let errorObject = {
            emailNotFound:false,
            emailRequired: false,
            incorrectEmail:false,
            passwordRequired: false,
            incompletePassword:false
        }
        if(logInfo.Email === "") errorObject.emailRequired = true;
        else {if(!EmailVarificationRegex.test(logInfo.Email)) errorObject.incorrectEmail = true;}

        if(logInfo.Password === "") errorObject.passwordRequired = true;
        else {if (logInfo.Password.length<8) errorObject.incompletePassword = true;}
        setError(errorObject)
        if(!errorObject.emailRequired && !errorObject.incorrectEmail && !errorObject.passwordRequired && !errorObject.incompletePassword){
            const sha1 = require("sha1")
            const password = sha1(logInfo.Password)
            const userLogInfo = await UserLogIn({
                "Email": `${logInfo.Email}`,
                "Password": `${password}`}
            );
            try{
                console.log(userLogInfo);
                if (userLogInfo === "Not Found") setError(prevState => ({...prevState, emailNotFound: true}))
                else {
                    await context.upDateStateOnLogIn(userLogInfo.id, userLogInfo.email, userLogInfo.name, userLogInfo.picture, userLogInfo.admin, true, userLogInfo.publisher);
                    setTimeout(() => {
                        if(userLogInfo.admin) navigator("/admin")
                        else navigator("/personalProfile")
                    }, 1000)
                }
            }
            catch (e){
                setServerError(true)
            }
        }
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom sing-in-form">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                    <Form onSubmit={handleFormSubmit}>
                    {serverError?<Alert variant={'danger'}>Server Error, can't Log-In now.</Alert>:""}
                    {error.emailRequired?<Alert variant={'danger'}>E-Mail Required</Alert>:""}
                    {error.passwordRequired?<Alert variant={'danger'}>Password is Empty</Alert>:""}
                    {error.incorrectEmail?<Alert variant={'danger'}>Incorrect E-Mail</Alert>:""}
                    {error.incompletePassword?<Alert variant={'danger'}>Password should be at least of 8 characters</Alert>:""}
                    {error.emailNotFound?<Alert variant={'danger'}>E-Mail And Password Did Not Match</Alert>:""}
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Email address'
                        id='formControlLg'
                        type='email'
                        size="lg"
                        name={"Email"}
                        required={true}
                        value={logInfo.Email}
                        onChange={async (e)=>{await changeFormState(e)}}
                    />
                    <MDBInput
                        wrapperClass='mb-1'
                        label='Password'
                        id='formControlLg'
                        type='password'
                        size="lg"
                        name={"Password"}
                        required={true}
                        value={logInfo.Password}
                        onChange={async (e)=>{await changeFormState(e)}}

                    />
                    <div className="d-flex justify-content-between mb-4">
                        <a href="/changePassword">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start  pt-2'>
                        <Button className={""} size='lg' type={"submit"}>Log In</Button>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/signUp" className="link-danger">Register</a></p>
                    </div>
                    </Form>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default SignIn;