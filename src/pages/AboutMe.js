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
      <div className="text">
        <h1 className="header"> About Me</h1>
        <p>Hi, I'm Zhi Hua, but for those who don't speak Chinese, you can just call me Jacob.</p>
        <p>I recently graduated with an Honours, Bachelors of Science from the University of Toronto, majoring in both Computer Science and Economics.</p>
        <p>In my free time, I enjoy teaching myself interesting, (albeit mostly useless), skills such as unicycling, juggling, or writing with both hands.</p>

        <p>I have some experince with website and database management, but I will learn whatever I need to do my job, no matter how obscure or seemingly useless it may be</p>




      </div>

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