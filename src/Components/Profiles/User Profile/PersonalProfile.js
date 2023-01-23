import React from "react";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import ProfileOptions from "./UserProfileOptions";
export default function PersonalProfile() {
    return (
        <>
            <div className={"UserProfile"}>
                <ProfileOptions />
                <UpdatePersonalInformation />
            </div>
        </>
    )
}