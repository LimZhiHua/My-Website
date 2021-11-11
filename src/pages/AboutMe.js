import React from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables
 from '../components/TwoTables';
import "../App.css"
import me from "../images/me.png"
const Left = ()=>{
  return(
    <h1>
      <img src={me} alt="My Face I guess"/>
    </h1>
  ) 
}

const Right = ()=>{
  return(
    <>
      <h1 className="header"> About Me!</h1>
      <p>My name is Lim Zhi Hua, but for those who don't speak Chinese, you can just call me Jacob</p>
      <p>Ahhhh, i hate talking about myself. this is so hard </p>
    </>
  ) 
}


function AboutMe() {
    return (
      <div className='hero-container'> 
        <TwoTables left={<Left/>} right={<Right/>}></TwoTables>
        </div>
    );
  }

  export default AboutMe