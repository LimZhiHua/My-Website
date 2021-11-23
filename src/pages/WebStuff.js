import React from 'react';
import TwoTables from '../components/TwoTables';
import "../App.css"
import TechnologiesRoutes from '../components/TechnologiesRoutes';
import Swiper from '../components/Swiper';
import SportcredPic from "../images/Sportcred.png"
const Left = ()=>{  
    return(
      <>
       <TechnologiesRoutes/>
       <div className="text">
            <h1 className="subheader">Description</h1>
            <p>I have experience using the following web development related technologies:</p>
            <ul className="circle">
                <li>React</li>
                <li>Node.js</li>
                <li>Auth0</li>
                <li>HTML</li>
                <li>Javascript</li>
                <li>CSS</li>
            </ul>  
        </div>
      </>
    ) 
  }
  
  const Right = ()=>{
    const swiperStyles = {slide: {
        height: "100vh",
      },
      slide1: {
        background: '#FEA900',
      },
      slide2: {
        background: '#B3DC4A',
      },
      slide3: {
        background: '#6AC0FF',
      },}

    const thisWebsite = (
        <>
            <h1 className="header">Projects</h1>
            <div className="text">
                <h1 className="subheader">This Website!</h1>
                <p>This website was made from scratch by me using React!</p>
                <br/>
                <p> Other than the css of the Navbar, and a few publicly available libraries, every part of this website was coded by me. The Source code can be found here:    <a href="https://github.com/LimZhiHua/My-Website">https://github.com/LimZhiHua/My-Website</a></p>
             
            </div>
        </>
    )

    const sportcred = (
        <>
            <h1 className="header">Projects</h1>
            <div className="text">
                <h1 className="subheader">Sportcred</h1>
                <p> During my studies, one of the courses involved going through the Agile software development lifecycle to create prototypes for real life clients. After the course was completed, the clients asked if we could continue working on it.</p>
                <br/>
                <p> My team members and I decided to create a working prototype located here: <a href="https://sportcred-staging.herokuapp.com/">https://sportcred-staging.herokuapp.com/</a> </p>
                <p> I have also created a copy of the source code located here: <a href="https://github.com/LimZhiHua/Sportcred">https://github.com/LimZhiHua/Sportcred</a></p>

                <img src ={SportcredPic} className="screenshot" alt="Snake" />

            </div>
        </>
    )




    const slides = [
        {
            value: thisWebsite,
            style: swiperStyles.slide1}, 
        {
            value:sportcred,
            style: swiperStyles.slide2
        },
       ]
    return(
      <>
        <Swiper styles={swiperStyles} slides={slides} />
      </>
    ) 
  }
  
  
  function Web() {
      return (
        <div className='hero-container'> 
          <TwoTables left={<Left/>} right={<Right/>}></TwoTables>
          </div>
      );
    }
  


  export default Web