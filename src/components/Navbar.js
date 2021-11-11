import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import { LinkButton } from "./LinkButton";
import "./Navbar.css";

function Navbar(){
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick=()=> {
        setClick(!click)
    }
    const closeMobileMenu=()=>{
        setClick(false)
    }

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false)
        }else{
            setButton(true)
        }
    }

    useEffect(()=>{
        showButton()
    },[])

    // this is to trigger when we resize our window
    window.addEventListener("resize", showButton)
    return(
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Lim Zhi Hua's Website  <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className= "menu-icon" onClick={handleClick}>
                        < i className={click ? "fa fa-times": "fas fa-bars"}/>
                    </div>
                    <ul className={click? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>                       
                        </li>
                        <li className="nav-item">
                            <Link to="/AboutMe" className="nav-links" onClick={closeMobileMenu}>
                                About Me!
                            </Link>                       
                        </li>
                        <li className="nav-item">
                            <Link to="/Technologies" className="nav-links" onClick={closeMobileMenu}>
                                Technologies
                            </Link>                       
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Signup
                            </Link>                       
                        </li>
                    </ul>
                    {button && <LinkButton buttonStyle="btn--outline"> SIGNUP</LinkButton>}
                </div>
            </nav>
        </>
    )
}

export default Navbar