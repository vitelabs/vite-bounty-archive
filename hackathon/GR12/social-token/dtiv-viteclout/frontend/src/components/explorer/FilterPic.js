import React from 'react'
import emptyProfile from '../empty-profile.png'

const FilterPic = (props) => {
    if(props.filterpic){
        const PF = "http://localhost:5000/images/"
        return (
            <div className="filter-img-wrap">
                <img className="filter-img" src={PF+props.filterpic} alt="" />
            </div>
        )
    }else{
        return(
            <div className="filter-img-wrap">
                <img className="filter-img" src={emptyProfile} alt="" />
            </div>
        )
    }
    
}

export default FilterPic
