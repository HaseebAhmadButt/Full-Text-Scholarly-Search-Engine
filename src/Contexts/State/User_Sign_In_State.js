import React, {useDebugValue, useState} from "react";
import User_Sign_In_Context from "../Context/User_Sign_In_Context";

const User_Sign_In_State = ({children})=>{
    const [userLogIn, setLogIn] = useState({
        user_id:"",
        user_email:"",
        user_name:"",
        user_picture:"",
        isAdmin:false,
        isAuthenticated:false,

    });

    const upDateStateOnLogIn= async (id, email, name, picture, isAdmin, isAuthenticated)=>{
        await setLogIn({
            user_id: id,
            user_email: email,
            user_name: name,
            user_picture: picture,
            isAdmin: isAdmin,
            isAuthenticated: isAuthenticated
        })
    }
    const upDateStateOnLogOut=()=>{
        setLogIn({
            user_id: "",
            user_email: "",
            user_name: "",
            user_picture: "",
            isAdmin: false,
            isAuthenticated: ""
        })
    }
    return (<User_Sign_In_Context.Provider value={{userLogIn, upDateStateOnLogIn, upDateStateOnLogOut}}>
        {children}
    </User_Sign_In_Context.Provider>)
}

export default User_Sign_In_State;