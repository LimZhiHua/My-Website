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
                        Lim Zhi Hua's Website 
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
                            <Link to="/Resume" className="nav-links" onClick={closeMobileMenu}>
                                Resume
                            </Link>                       
                        </li>
                        <li className="nav-item">
                            <Link to="/Excel" className="nav-links" onClick={closeMobileMenu}>
                                Skills
                            </Link>                       
                        </li>
                        <li className="nav-item">
                            <Link to="/Technologies" className="nav-links" onClick={closeMobileMenu}>
                                Contact Details
                            </Link>                       
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar