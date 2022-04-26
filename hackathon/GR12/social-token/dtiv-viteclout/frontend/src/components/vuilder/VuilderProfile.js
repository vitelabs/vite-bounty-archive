import React from 'react'
import VuilderTweets from './VuilderTweets'
import BondCurve from './BondCurve';
import Stats from './Stats';
import axios from 'axios'
import ProfilePic from './ProfilePic';
import Transact from './Transact';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useState, useEffect } from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import { createCurve } from '../../functions';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../Context'


const VuilderProfile = (props) => {
    // GET VUILDER ID
    const location = useLocation();
    const context = useContext(userContext)

    const vuilder_ID = location.pathname.replace("/vuilder/", "")
    const [vuilder, setVuilder] = useState({})
    
    // GET USER DATA FROM VITECLOUT-SERVER
    useEffect(() => {
        const getVuilder = async () => {
            const res = await axios.get("/user/"+vuilder_ID);
            setVuilder(res.data)
        }
        getVuilder()
    },[vuilder_ID])

    // DATA FROM SMART CONTRACT
    var reserve = 1000;
    var current_price = 0.003;
    var current_sold = 0
    const minted = "Not Minted Yet"

    // CREATE CURVE DATA
    var data = []
    createCurve(data,current_price,reserve)
    
    let created; 
    if(vuilder.createdAt){
        created = vuilder.createdAt.split("T")[0]
    }
    var txt = ReactHtmlParser(vuilder.blog)

    const PF = "http://localhost:5000/images/"
    if(context){
        return (
            <div id="profile" className="l-border">
                <div className="profile-wrap">
                    <div className="main-profile">
                        <div className="mobile-header l-txt hide">{vuilder.twitterId}</div>
                        <ProfilePic profilePic={PF+vuilder.profilePic}/>
                        {/* USER NEEDS TO BE CHANGED TO CURRENT USER NOT ISVUILDER */}
                        <Transact user={context}/>
                    </div>
                    <div className="profile-blog">
                        <div>
                            <div className="blog-wrap">
                                <div className="blog-top">
                                    <div className="l-txt desktop-header">{vuilder.twitterId}</div>
                                    <div className="edit-wrap">
                                        {
                                            context._id === vuilder_ID ? (
                                                <div> 
                                                    <Link to={`/vuilder/${vuilder_ID}/edit`} className="edit-btn">
                                                        <div >
                                                            Edit
                                                        </div>
                                                    </Link>
                                                </div>
                                            ) :<></>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="line"></div>
                            </div>
                            <div className="blog-head"><strong>{vuilder.header}</strong></div>
                            <div><small>Vuider since: {created}</small></div>
                            <div className="blog-body">{txt}</div>
                            <div className="line"></div>
                            <div id="vuilder-socials">
                                <div className="git-tab"><a href="http://www.github.com" target="__blank"><FaGithubSquare /></a></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <section className="profile-bottom">
                    <div className="top-stats">
                        <div>
                            <div className="m-txt">
                                <strong>Current Price</strong>
                            </div>
                            <div className="s-txt">PRICE</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>VFT Sold</strong>
                            </div>
                            <div className="s-txt">50</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>VFT Remaining</strong>
                            </div>
                            <div className="s-txt">1000</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>Minted</strong>
                            </div>
                            <div className="s-txt">2021</div>
                        </div>
                    </div>
                    <div className="bonding-curve">
                        <BondCurve current_price={50} data={data}/>
                    </div>
                    <div className="stats-tweets">
                        <div id="stats">
                            <Stats />
                        </div>
                        <div id="vuilder-tweets">
                            <VuilderTweets />
                        </div>
                    </div>
                    
                </section>
                
            </div>
        )
    }else{
        return (
            <div id="profile" className="l-border">
                <div className="profile-wrap">
                    <div className="main-profile">
                        <div className="mobile-header l-txt hide">{vuilder.twitterId}</div>
                        <ProfilePic profilePic={PF+vuilder.profilePic}/>
                        {/* USER NEEDS TO BE CHANGED TO CURRENT USER NOT ISVUILDER */}
                        <Transact user={context}/>
                    </div>
                    <div className="profile-blog">
                        <div>
                            <div className="blog-wrap">
                                <div className="blog-top">
                                    <div className="l-txt desktop-header">{vuilder.twitterId}</div>
                                </div>
                                <div className="line"></div>
                            </div>
                            <div className="blog-head"><strong>{vuilder.header}</strong></div>
                            <div><small>Vuider since: {created}</small></div>
                            <div className="blog-body">{txt}</div>
                            <div className="line"></div>
                            <div id="vuilder-socials">
                                <div className="git-tab"><a href="http://www.github.com" target="__blank"><FaGithubSquare /></a></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <section className="profile-bottom">
                    <div className="top-stats">
                        <div>
                            <div className="m-txt">
                                <strong>Current Price</strong>
                            </div>
                            <div className="s-txt">PRICE</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>VFT Sold</strong>
                            </div>
                            <div className="s-txt">50</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>VFT Remaining</strong>
                            </div>
                            <div className="s-txt">1000</div>
                        </div>
                        <div>
                            <div className="m-txt">
                                <strong>Minted</strong>
                            </div>
                            <div className="s-txt">2021</div>
                        </div>
                    </div>
                    <div className="bonding-curve">
                        <BondCurve current_price={50} data={data}/>
                    </div>
                    <div className="stats-tweets">
                        <div id="stats">
                            <Stats />
                        </div>
                        <div id="vuilder-tweets">
                            <VuilderTweets />
                        </div>
                    </div>
                    
                </section>
                
            </div>
        )
    }
    
}

export default VuilderProfile
