import React from 'react'
import TradeResults from './TradeResults'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import FilterPic from './FilterPic'


const ExploreTable = (props) => {
    // MAKE RESULTS MORE DYNAMIC WITH MAP INSTEAD OF [0]
    var results = props.vuilder[0]
    console.log("RESULTS:",results)

    if(results){
        return (
            <div className={`${results ? 'table-container active' : 'hide'}`}>
                <div className="results-header">Results for: {results.twitterId}</div>
                <div className="vuilder-box">
                    <Link to={`/vuilder/${results._id}`} className="vuilder-link">
                        <div className="inner-wrap">
                            <FilterPic filterpic={results.profilePic}/>
                            <div className="box-header">
                                <div className="name-price">
                                    <div className="m-txt"><strong>{results.twitterId}</strong></div>
                                    <div className="box-price">0.03<small>VITE</small></div>
                                </div>
                                <div className="line-light"></div>
                                <div className="box-stats">
                                    <div>VLT Sold:</div>
                                    <div>0</div>
                                    <div>VLT Remaining:</div> 
                                    <div>1000</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <table id="explore-table">
                    <tbody>
                        <tr className="etable-header">
                            <th>Type</th>
                            <th>ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Circulating</th>
                            <th>VFT Reserve</th>
                            <th>Vite Reserve</th>
                        </tr>
                        <TradeResults/>
                    </tbody>
                </table>
            </div>   
        )
    }else{
        return(
            <div className="hide"></div>
        )
    }
    
}

export default ExploreTable
