import React from 'react';
import "../App.css"
import {Link} from "react-router-dom"

function TechnologiesRoutes(props) {
 

    return(
      <>
      <h1 className="header"> Technologies I've Used!</h1>
      <Link to="/" className="hyperlink" >Home</Link>   
      <Link to="/Excel" className="hyperlink" >Excel VBA</Link> 
      <Link to="/Encryption" className="hyperlink" >Encryption/Decryption</Link> 
      </>
    )

}

export default TechnologiesRoutes