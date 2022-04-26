import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

const Navbar = () => {
   
    const {isAuth} = useContext(AuthContext);
  
    return (
      isAuth
      ?
     <div className="navbar">
           <div className="navbar__links">
            <Link to="/mytokens">My Page</Link>
            <Link to="/alltokens">All Tokens</Link>
        </div>
      </div>
      : null
    );
};

export default Navbar;