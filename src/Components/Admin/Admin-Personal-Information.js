import React, {useContext, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import User_Sign_In_Context from "../../Contexts/Context/User_Sign_In_Context";
import sha1 from "sha1";
import {changeName} from "../../Services/AuthorProfileServices/AccountSettingService";
import {changePassword} from "../../Services/AuthenticationService/LogInSignUpService";

export default function AdminPersonalInformation() {
    const context = useContext(User_Sign_In_Context)
    // const [image, setImage] = useState("");
    const [formValues, setFormValues] = useState({
        email:context.userLogIn.user_email,
        name:context.userLogIn.user_name,
        password:"",
        confirmPassword:""
    });
    const [errors, setErrors] = useState({
        blankName:false,
        differentPasswords:false,
        passwordLength:false,
        blankPassword:false,
        fieldError:false,
        Success:false,
        serverError:false
    })
    function handleFormFields(e){
        const fieldName = e.target.name;
        setFormValues(prevState => ({...prevState, [fieldName]:e.target.value}))
    }

    async function updateErrors(string){
        await setErrors({
            emailIncorrect:string==="emailIncorrect",
            blankEmail:string==="blankEmail",
            blankName:string==="blankName",
            blankPassword:string==="blankPassword",
            differentPasswords:string==="differentPasswords",
            passwordLength:string==="passwordLength"

        })
    }
    const handleFormSubmit = async (e)=>{
        console.log("Form Submit Method")
        e.preventDefault();

        let object={
            blankName:false,
            differentPasswords:false,
            blankPassword:false,
            passwordLength:false,
            fieldError:false,
            Success:false,
            serverError:false
        }
        if(formValues.name.trim()==="")
        {
            object.blankName = true;

        }

        if(formValues.password.trim() === ""){
            object.blankPassword=true;
        }
        else {
            if(formValues.password.trim().length<8 ){
                object.passwordLength=true;
            }
            else if(formValues.password.trim() !== formValues.confirmPassword.trim()){
                object.differentPasswords=true;
            }
        }
        await setErrors(object)
        if(!object.blankName && !object.blankPassword && !object.differentPasswords && !object.differentPasswords && !object.passwordLength){

            const sha1 = require("sha1");
            const Password = sha1(formValues.password);
            const passData = {
                Email: `${context.userLogIn.user_email}`,
                Password: `${Password}`
            };

            const nameData = {
                ID: context.userLogIn.user_id,
                Name: `${formValues.name}`
            };


            try{
                const results = await Promise.all([changeName(nameData), changePassword(passData)])
                if(results.every(value => value === 200)) {
                    object.Success = true;
                    await setErrors(object)
                    await context.upDateStateOnLogIn(context.userLogIn.user_id, context.userLogIn.user_email, formValues.name, context.userLogIn.user_picture, context.userLogIn.isAdmin, true)
                }
                else {
                    object.Success = false;
                    object.fieldError = true;
                    await setErrors(object)
                    await setErrors(object)

                }
            }
            catch (e){
                object.serverError = true;
                await setErrors(object)
            }
        }

    }


    return (<>
            <Form className={"personal-profile-update-form account-settings"} onSubmit={handleFormSubmit}>
                <h2>Account Settings</h2>
                {errors.differentPasswords?<Alert variant={"danger"}>Passwords did not match</Alert>:""}
                {errors.blankName?<Alert variant={"danger"}>Name Field is Empty</Alert>:""}
                {errors.passwordLength?<Alert variant={"danger"}>Password should be of at-least 8 characters</Alert>:""}
                {errors.blankPassword?<Alert variant={"danger"}>Password Fields are Empty</Alert>:""}
                {errors.serverError?<Alert variant={"danger"}>Server Error. Can't Update Fields Right Now</Alert>:""}
                {errors.Success?<Alert variant={"success"}>Fields Updated Successfully</Alert>:""}
                {errors.fieldError?<Alert variant={"secondary"}>Could Not Update All the fields.</Alert>:""}
                <Form.Group controlId="formBasicEmail">

                    {/*<Form.Label className={"label"}>*/}
                    {/*    Profile Picture:*/}
                    {/*</Form.Label>*/}
                    {/*<Form.Control*/}
                    {/*    type="file"*/}
                    {/*    placeholder="Upload a profile picture"*/}
                    {/*    className={"profile-upload"}*/}
                    {/*/>*/}
                    <Form.Label className={"label"}>
                        User Name:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter New Name"
                        className={"middle-search-input profile-input"}
                        onChange={(e)=>{handleFormFields(e)}}
                        name={"name"}
                        value={formValues.name}/>
                    <Form.Label className={"label"}>
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        className={"middle-search-input profile-input"}
                        onChange={(e)=>{handleFormFields(e)}}
                        name={"password"}/>

                    <Form.Label className={"label"}>
                        Confirm Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        className={"middle-search-input profile-input"}
                        onChange={(e)=>{handleFormFields(e)}}
                        name={"confirmPassword"}/>
                </Form.Group>
                <Button type={"submit"} variant={"primary"} className={"personal-profile-update-main-button"}>Update</Button>
            </Form>
        </>)
}