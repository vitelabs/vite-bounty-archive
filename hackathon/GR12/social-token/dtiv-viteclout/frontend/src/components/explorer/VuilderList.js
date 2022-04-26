import React from 'react'
import { useState, useEffect } from 'react'
// import { vuilders } from '../database/vuilders'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FilterPic from './FilterPic'

const VuilderList = () => {
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1*(10**1000))
    const [isMinted, setIsMinted] = useState("all")
    const [vuilder, setVuilder] = useState({})

    // GET USER DATA FROM VITECLOUT-SERVER
    useEffect(() => {
        const getVuilder = async () => {
            const res = await axios.get("/user/list");
            console.log(res)
            setVuilder(res.data)
        }
        getVuilder()
    },[])
    //  VUILDER NEEDS TO BE SORTED TO INCULED ONLY VULDERS
    // ADD TOKEN CONTRACT VALUES
    if(vuilder.length > 0){
        return (
            <div id="vuilder-list">
                <div className="l-txt results-header">
                    ALL VUILDERS
                </div>
                <div className="vuilder-filter">
                    <div className="line"></div>
                    <form action="" className="filter-form">
                        <div className="price-sec">
                            <input className="filter-input" type="" placeholder="Min Price" onChange={(e) => (setMinPrice(e.target.value))} />
                            <input type="" className="filter-input" placeholder="Max Price" onChange={(e) => (setMaxPrice(e.target.value))}/>
                        </div>
                        <div>
                            <select name="" className="mint-filter filter-input" id="" defaultValue="all" placeholder="Minted" onChange={(e) => (setIsMinted(e.target.value))}>
                                <option value="all">All</option>
                                <option value={true}>Minted</option>
                                <option value={false}>Not Minted</option>
                            </select>
                        </div>
                    </form>
                    <div className="line"></div>
                </div>
                
                <div>
                    
                    <div className="vft-section">
                        {/* ADD FILTER WITH CONTRACT DATA HERE 
                        .filter((vuilder) => (vuilder.current_price > minPrice)
                        && (vuilder.current_price < maxPrice)
                        && ( isMinted == "all" | (isMinted == vuilder.minted))) */}
                        {vuilder.filter((vuilder) => vuilder.isVuilder).map(vuilder => (
                            <div key={vuilder._id}>
                                <div className="vuilder-box">
                                    <Link to={`/vuilder/${vuilder._id}`} className="vuilder-link">
                                        <div className="inner-wrap">
                                            <div className='explore-img-wrap'>
                                                <FilterPic filterpic={vuilder.profilePic}/>
                                            </div>
                                            
                                            <div className="box-header">
                                                <div className="name-price">
                                                    <div className="m-txt"><strong>{vuilder.twitterId}</strong></div>
                                                    <div className="box-price">{vuilder.current_price} <small>VITE</small></div>
                                                </div>
                                                <div className="line-light"></div>
                                                <div className="box-stats">
                                                    <div>VLT Sold:</div>
                                                    <div>{vuilder.sold}</div>
                                                    <div>VLT Remaining:</div> 
                                                    <div>{vuilder.vft_reserve}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        )
    }else{
        return (
            <div>Loading</div>
        )
    }
    
}

export default VuilderList
