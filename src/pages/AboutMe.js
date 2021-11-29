import React from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables
 from '../components/TwoTables';
import "../App.css"
import me from "../images/me.png"
const Left = ()=>{
  return(
    <div className="colouredHorizontalBlock3">
      <img  className="screenshot" src={me} alt="My Face I guess"/>
    </div>
  ) 
}

const Right = ()=>{
  return(
    <>
    <div className="colouredHorizontalBlockFull4">
      <div className="text">
        <h1> About Me</h1>
        <p>Hi, I'm Zhi Hua, but for those who don't speak Chinese, you can just call me Jacob.</p>
        <p>I recently graduated with an Honours, Bachelors of Science from the University of Toronto, majoring in both Computer Science and Economics.</p>
        <p>In my free time, I enjoy teaching myself interesting, (albeit mostly useless), skills such as unicycling, juggling, or writing with both hands.</p>
        <p>I have some experince with website and database management, but I will learn whatever I need to do my job, no matter how obscure or seemingly useless it may be</p>
      </div>
    </div>
    </>
  ) 
}


function AboutMe() {
    return (
      <div> 
        {//<TwoTables left={<Left/>} right={<Right/>}></TwoTables>
        }
        <div className="colouredHorizontalBlock0">
            <Right/>
      </div>
        </div>
    );
  }

  export default AboutMe