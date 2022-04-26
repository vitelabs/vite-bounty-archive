import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../empty-profile.png'


const VuilderCard = (props) => {
    if(props.vuilder.profilePic){
        const PF = "http://localhost:5000/images/"
        return (
            <div className="vuilder-card">
                <Link to={`/vuilder/${props.vuilder._id}`}>
                    <img className="profile-pic" src={PF+props.vuilder.profilePic} alt="" />
                    <div className="vuilder-name">
                        {props.vuilder.twitterId}
                    </div>
                </Link>
            </div>
        )
    }else{
        return (
            <div className="vuilder-card">
                <Link to={`/vuilder/${props.vuilder._id}`}>
                    <img className="profile-pic" alt="" src={profile}/>
                    <div className="vuilder-name">
                        {props.vuilder.twitterId}
                    </div>
                </Link>
            </div>
        )
    }
    
}

export default VuilderCard
