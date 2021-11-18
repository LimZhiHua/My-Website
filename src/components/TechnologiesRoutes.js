import React from 'react';
import "../App.css"
import {Link} from "react-router-dom"

function TechnologiesRoutes(props) {
 

    return(
      <>
      <h1 className="header">Skills</h1>
      <Link to="/Excel" className="hyperlink" >Excel VBA</Link> 
      <Link to="/Encryption" className="hyperlink" >Encryption/Decryption</Link> 
      <Link to="/Web" className="hyperlink" >Web Development</Link>   
      </>
    )

}

export default TechnologiesRoutes