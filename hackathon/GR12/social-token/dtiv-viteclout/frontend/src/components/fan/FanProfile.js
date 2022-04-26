import React from 'react'
import { FaGithubSquare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import { createCurve } from '../../functions';
import { Link } from 'react-router-dom';
import Stats from '../vuilder/Stats';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import VuilderTweets from '../vuilder/VuilderTweets';
import FanTransac from './FanTransac';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePic from '../vuilder/ProfilePic';
import { useContext } from 'react'
import { userContext } from '../Context';

const FanProfile = () => {
    const location = useLocation();
    const context = useContext(userContext)
    console.log(context)
    const fan_ID = location.pathname.replace("/profile/", "")
    const [fan, setFan] = useState({})

    // GET USER DATA FROM VITECLOUT-SERVER
    useEffect(() => {
        const getFan = async () => {
            const res = await axios.get("/user/"+fan_ID);
            setFan(res.data)
        }
        getFan()
    },[fan_ID])

    let created; 
    if(fan.createdAt){
        created = fan.createdAt.split("T")[0]
    }

    var txt = ReactHtmlParser(fan.blog)
    const PF = "http://localhost:5000/images/"
    if(context){
        return (
            <div id="profile" className="l-border">
                <div className="profile-wrap">
                    <div className="main-profile">
                        <div className="mobile-header l-txt hide">{fan.twitterId}</div>
                        <ProfilePic profilePic={PF+fan.profilePic} />
                    </div>
                    <div className="profile-blog">
                        <div className='fan-txt-wrap'>
                            <div>
                                <div className="blog-wrap">
                                    <div className="blog-top">
                                        <div className="desktop-header l-txt">{fan.twitterId}</div>
                                        <div className="edit-wrap">
                                            {
                                                context._id === fan_ID ? (
                                                    <Link to={`/profile/${fan_ID}/edit`} className="edit-btn">
                                                        <div >
                                                            Edit
                                                        </div>
                                                    </Link>
                                                ) : <></>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div className="blog-head"><strong>{fan.header}</strong></div>
                                <div className="blog-body">{txt}</div>
                                <div className="line"></div>
                                <div id="vuilder-socials">
                                    <div className="git-tab"><a href="http://www.github.com" target="__blank"><FaGithubSquare /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <section className="profile-bottom">
                        <div className="top-stats">
                            <div>
                                <div className="m-txt">
                                    <strong>VFT Balance</strong>
                                </div>
                                <div className="s-txt">10</div>
                            </div>
                            <div>
                                <div className="m-txt">
                                    <strong>VITE Balance</strong>
                                </div>
                                <div className="s-txt">500</div>
                            </div>
                        </div>
                        <div className="stats-tweets">
                            <div id="stats">
                                <FanTransac />
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
                        <div className="mobile-header l-txt hide">{fan.twitterId}</div>
                        <ProfilePic profilePic={PF+fan.profilePic} />
                    </div>
                    <div className="profile-blog">
                        <div className='fan-txt-wrap'>
                            <div>
                                <div className="blog-wrap">
                                    <div className="blog-top">
                                        <div className="desktop-header l-txt">{fan.twitterId}</div>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div className="blog-head"><strong>{fan.header}</strong></div>
                                <div className="blog-body">{txt}</div>
                                <div className="line"></div>
                                <div id="vuilder-socials">
                                    <div className="git-tab"><a href="http://www.github.com" target="__blank"><FaGithubSquare /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <section className="profile-bottom">
                        <div className="top-stats">
                            <div>
                                <div className="m-txt">
                                    <strong>VFT Balance</strong>
                                </div>
                                <div className="s-txt">10</div>
                            </div>
                            <div>
                                <div className="m-txt">
                                    <strong>VITE Balance</strong>
                                </div>
                                <div className="s-txt">500</div>
                            </div>
                        </div>
                        <div className="stats-tweets">
                            <div id="stats">
                                <FanTransac />
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

export default FanProfile
