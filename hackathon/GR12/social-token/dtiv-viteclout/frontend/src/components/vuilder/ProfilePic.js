import React from 'react'
import emptyProfile from '../empty-profile.png'

const ProfilePic = (props) => {
    if(props.profilePic){
        var img = props.profilePic.replace("http://localhost:5000/images/","")
        if(img){
            return (
                <div className="profile-card">
                    <img className="profile-pic" src={props.profilePic} alt="" />
                </div>
        )else{
            return (
                <div className="profile-card">
                    <img className="profile-pic" src={emptyProfile} alt="" />
                </div>
            )
        }
    }else{
        return (
            <div className="profile-card">
                <img className="profile-pic" src={emptyProfile} alt="" />
            </div>
        )
    }
    
}

export default ProfilePic
