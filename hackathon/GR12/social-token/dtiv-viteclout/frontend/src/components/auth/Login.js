import React from 'react'
import { useState } from 'react'
import { AiFillTwitterSquare } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [select, setSelect] = useState(0)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    // REDIRECT AFTER LOGIN
    const navigate = useNavigate();

    // ADMIN LOGIN
    function loginSubmit(e){
        if(e.target.value === 'Admin'){
            document.getElementById('admin-login').classList.toggle('hide')
            document.getElementById('twitter-login').classList.toggle('hide')
            setSelect(e.target.value)
        }
    }

    return (
        <div id="login" className="l-border">
            <div className="login-card">
                <div className="login-header l-txt">
                    Login
                </div>
                <div className="login-select">
                    <input className="main-btn" type="button" value="Admin" onClick={loginSubmit}/>
                </div>
                <div id="admin-login" className="hide">
                    <div className="m-txt">
                        Admin
                    </div>
                    <form id="login-form" action="" onSubmit={e => {
                        e.preventDefault();
                        navigate('/')
                    }}>
                        <div>   
                            <input className="login-input" type="text" placeholder="Enter Username" onChange={e=>setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <input className="login-input" type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <input className="login-input main-btn" type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
                <div id="twitter-login">
                    <div className="m-txt">
                        Fans | Vuilders
                    </div>
                    <div className="twitter-login-wrap">
                        {/* TWITTER AUTHENTICATION ENPOINT == MAKE DYNAMIC */}
                        <a href="http://localhost:5000/auth/twitter"><AiFillTwitterSquare /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
