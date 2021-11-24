import React from 'react';
import "../App.css"
import {Link} from "react-router-dom"

function TechnologiesRoutes(props) {
 

    return(
      <>
      <div className="text">
      <h2 className="header">Skills</h2>
        <Link to="/Excel" className="hyperlink" >Excel VBA</Link> 
        <Link to="/Encryption" className="hyperlink" >Encryption/Decryption</Link> 
        <Link to="/Web" className="hyperlink" >Web Development</Link>   
      </div>
     
      </>
    )

}

export default TechnologiesRoutes