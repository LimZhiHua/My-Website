import React from 'react';
import "../App.css"
import TechnologiesRoutes from '../components/TechnologiesRoutes';
import SportcredPic from "../images/Sportcred.png"

const Description = ()=>{  
    return(
      <>
       <div className="text">
          <h1>Description</h1>
          <p>I have experience using the following web development related technologies:</p>
          <ul className="circle">
              <li>React</li>
              <li>Node.js</li>
              <li>Auth0</li>
              <li>HTML</li>
              <li>Javascript</li>
              <li>CSS</li>
          </ul>  
          <p> Below are a few of the projects I worked on</p>
        </div>
      </>
    ) 
  }
  
  const Sportcred = ()=>{
    return(
    <>
        <div className="text">
            <h2 >Sportcred</h2>
            <p> During my studies, one of the courses involved going through the Agile software development lifecycle to create prototypes for real life clients. After the course was completed, the clients asked if we could continue working on it.</p>
            <p> My team members and I decided to create a working prototype located here: <a href="https://sportcred-staging.herokuapp.com/">https://sportcred-staging.herokuapp.com/</a> </p>
            <p> I have also created a copy of the source code located here: <a href="https://github.com/LimZhiHua/Sportcred">https://github.com/LimZhiHua/Sportcred</a></p>
            <img src ={SportcredPic} className="screenshot" alt="Snake" />
        </div>
    </>
)
    }

  
  const ThisWebsite = ()=>{
    return (
      <>
          <div className="text">
            <h2 >This Website!</h2>
            <p>This website was made from scratch by me using React!</p>
            <p> Other than the css of the Navbar and a few publicly available libraries, every part of this website was coded by me. The Source code can be found here:    <a href="https://github.com/LimZhiHua/My-Website">https://github.com/LimZhiHua/My-Website</a></p>
          </div>
      </>
  )}
  function Web() {
      return (
        <>
          <div className="colouredHorizontalBlock0">
            <TechnologiesRoutes/>
          </div>
          <div className="colouredHorizontalBlock1">
            <Description/>
          </div>
          <div className="colouredHorizontalBlock2">
            <ThisWebsite/>
          </div>
          <div className="colouredHorizontalBlock3">
            <Sportcred/>
          </div>

          </>
      );
    }
  


  export default Web