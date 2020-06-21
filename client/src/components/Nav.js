import React,{ useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarDropdown from './Avatardropdown';



const Nav = () => {
    const authContext = useContext(AuthContext);
       
return (
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <Link className="navbar-brand" to="/"> Home </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>  

                <div className="flex">
                    <input
                    className="py-2 px-4 border bg-gray-100 border-gray-300 rounded-full focus:outline-none w-32 sm:w-64"
                    placeholder="Search"
                />
                <button className="rounded-full bg-gradient px-4 ml-2 text-white flex items-center text-xs focus:outline-none shadow-lg">
                <FontAwesomeIcon icon={faArrowRight} />
                </button>
    </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link "
                        to="/signup">Sign up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link "
                        to={
                            authContext.isAuthenticated() ? '/dashboard' : '/signin'
                        } >Sign in</Link>
                    </li>
                </ul>
            
            </div>
            {authContext.isAuthenticated() &&(
                 <div className="dropdown-navbar">
                    <AvatarDropdown />
 
                 </div>
            )}
           
        

        
        

        </nav>
        
    
  )
}

export default Nav
