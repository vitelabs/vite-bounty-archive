import React from 'react'
import VuilderTweets from './VuilderTweets'
import BondCurve from './BondCurve';
import Stats from './Stats';
import { FaGithubSquare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'
import { createCurve } from '../../functions';
import { Link } from 'react-router-dom';
import Transact from './Transact';
import axios from 'axios'
import { useEffect, useState } from 'react'

const user = "vuilder"

const Test = () => {
    const [vuilders, setVuilders] = useState([]);
    const location = useLocation();
    const vuilder_ID = location.pathname.replace("/vuilder/", "")
    var reserve = 1000;
    var current_price = 0.003;
    var current_sold = 0
    const minted = "Not Minted Yet"
    var data = []
    createCurve(data,current_price,reserve)
    
    useEffect(()=>{
        const getVuilders = async () => {
           const res = await axios.get("user/61b52b0a6e24a8274bf03a13")
            // var vuilders = res.data.filter(obj => obj.isVuilder === true)
            console.log(res.data)
            setVuilders(res)
        }
        getVuilders()
    },[])
    return (
        <div id="profile" className="l-border">
            <div className="profile-wrap">
                <div className="main-profile">
                    <div className="profile-card">
                        <img className="profile-pic" src="{vuilder.image}" alt="" />
                    </div>
                    <Transact user={user}/>
                </div>
                <div className="profile-blog">
                    <div>
                        <div className="blog-wrap">
                            <div className="blog-top">
                                <div className="l-txt">NAME</div>
                                <div className="edit-wrap">
                                    <Link to={`/vuilder/${vuilder_ID}/edit`} className="edit-btn">
                                        <div >
                                            Edit
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div className="blog-head">HEADER</div>
                        <div className="blog-body">BLOG</div>
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

export default Test
