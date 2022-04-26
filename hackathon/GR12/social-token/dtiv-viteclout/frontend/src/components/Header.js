import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../components/empty-profile.png'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from './Context'
// AUTHENTICATION
const fan_id = "1"

const Header = () => {
    const context = useContext(userContext)
    function openNav() {
        console.log("clicked")
        document.getElementById("mySidenav").style.width = "100%";
    }
      
    function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    }

    const logout = async () => {
        closeNav()
        const res = await axios.get('/logout', { withCredentials: true })
        if(res.data === 'loggedout'){
            window.location.href = "/"
        }
    }
    const PF = "http://localhost:5000/images/"
    if(context){
        return (
            <header>
                <nav>
                    <div className="nav-wrap">
                        <Link to="/" className="logo"><span className="vite-txt">vite</span>Clout</Link>
                        <div className="menu">
                            <Link className='explore-btn' to="/explore">Explore</Link>
                        </div>
                        <div className="nav-btn-wrap">
                            <a className="nav-btn" onClick={logout}>Logout</a>
                            <Link className="nav-btn vc-nav-btn" to="/auth/viteconnect">ViteConnect</Link>
                            <div className='nav-name'>{context.twitterId}</div>
                            { context.profilePic ? (
                                    <Link to={`/profile/${context._id}`}>
                                        <img className="nav-profile" src={PF + context.profilePic} alt="" />
                                    </Link>
                                ):
                                <Link to={`/profile/${context._id}`} disabled>
                                    <img className="nav-profile" src={profile} alt="" />
                                </Link>
                            }
                            <div className='hamburger hide'>
                                <span className='hamburger-btn' onClick={openNav}>&#9776;</span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    { context.profilePic ? (
                        <div className='navslide-wrap'>
                            <Link to={`/profile/${context._id}`}>
                                <img className="slide-nav-profile" src={PF + context.profilePic} alt="" />
                            </Link>
                            <a className='nav-slide-name'>{context.twitterId}</a>
                            
                        </div>
                            
                            
                        ):
                        <div className='navslide-wrap'>
                            <Link to={`/profile/${context._id}`} disabled>
                                <img className="slide-nav-profile" src={profile} alt="" />
                            </Link>
                            <a className=''>{context.twitterId}</a>
                        </div>
                        
                    }
                    <a className="cursor" onClick={logout}>Logout</a>
                    <Link className="" to="/auth/viteconnect" onClick={closeNav}>ViteConnect</Link>
                    <Link to="/explore" onClick={closeNav}>Explore</Link>
                </div>
            </header>
        )
    }else{
        return(
            <header>
                <nav>
                    <div className="nav-wrap">
                        <Link to="/" className="logo"><span className="vite-txt">vite</span>Clout</Link>
                        <div className="menu">
                            <Link className='explore-btn' to="/explore">Explore</Link>
                        </div>
                        <div className="nav-btn-wrap">
                            <Link className="nav-btn" to="/login">Login</Link>
                            <Link className="nav-btn vc-nav-btn" to="/auth/viteconnect">ViteConnect</Link>
                            <Link to={`/`} disabled>
                                <img className="nav-profile" src={profile} alt="" />
                            </Link>
                            <div className='hamburger hide'>
                                <span className='hamburger-btn' onClick={openNav}>&#9776;</span>
                            </div>
                        </div>
                        <div id="mySidenav" class="sidenav">
                            <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                            <Link to={`/`} disabled>
                                <img className="slide-nav-profile" src={profile} alt="" onClick={closeNav}/>
                            </Link>
                            <Link className="" to="/login" onClick={closeNav}>Login</Link>
                            <Link className="" to="/auth/viteconnect" onClick={closeNav}>ViteConnect</Link>
                            <Link to="/explore" onClick={closeNav}>Explore</Link>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
    
}

export default Header
