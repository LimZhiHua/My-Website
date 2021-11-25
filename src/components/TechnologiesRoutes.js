import React from 'react';
import "../App.css"
import {Link} from "react-router-dom"

function TechnologiesRoutes(props) {
 

    return(
      <>
      <div className="text">
      <h2 className="header">Skills</h2>
        <Link to="/Excel" className="hyperlink" ><i class="fas fa-file-excel fa-fw"></i>Excel VBA </Link> 
        <Link to="/Encryption" className="hyperlink" > <i class="fas fa-lock fa-fw"></i>Encryption/Decryption</Link> 
        <Link to="/Web" className="hyperlink" > <i class="fab fa-react fa-fw"></i>Web Development</Link>   
      </div>
     
      </>
    )

}

export default TechnologiesRoutes