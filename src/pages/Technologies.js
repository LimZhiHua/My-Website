import React from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables
 from '../components/TwoTables';
import "../App.css"
import { generateKeyPair } from '../components/Encryption';
import {Link} from "react-router-dom"

const Left = ()=>{
  return(
    <>
      <h1 className="header"> Technologies I've Used!</h1>
      <Link to="/" className="hyperlink" >Home</Link>   
      <Link to="/Encryption" className="hyperlink" >Encryption/Decryption</Link>   

    </>
  ) 
}

const Right = ()=>{
  return(
    <>
        
    </>
  ) 
}


function Technologies() {
    return (
      <div className='hero-container'> 
        <TwoTables left={<Left/>} right={<Right/>}></TwoTables>
        </div>
    );
  }

  export default Technologies