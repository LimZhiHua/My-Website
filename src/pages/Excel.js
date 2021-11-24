import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables
 from '../components/TwoTables';
import "../App.css"
import TechnologiesRoutes from '../components/TechnologiesRoutes';
import { Button } from '@material-ui/core';
import Swiper from '../components/Swiper';
import "./Excel.css"
import ExcelSnake from "../files/StatisticsSnake.xlsm"
import SnakeImg from "../images/Snake.png"
import CrosswordImg from "../images/Crossword.png"
import ExcelCrossword from "../files/Crossword.xlsm"

function Excel() {

    const IntroExcel = ()=>{
        return(
          <>
              <div className="text">
              <h1 className="subheader">Microsoft Excel and VBA</h1> 
              <p> During my time at Schneider Electric as a Data Analyst/IT Intern, I had the chance to teach myself Visual Basics for Applications (VBA), a programming language that can easily interact with Microsoft products such as Excel, Access, or Outlook </p>
              <br/>
              <p> While I did create many "normal" macros to automate more conventional tasks such as processing data or sending emails, I also had the opportunity to create a few simple games in VBA</p>
              <br/>
              <p> One of the tasks assigned to me was to "gamify" the learning experience for some training data. To accomplish this goal, I created educational games which could be played by anyone with Microsoft Excel</p>
              <p> Some examples of this can be seen and downloaded on the right.</p>
      
              <br/>
      
              </div>
          </>
        ) 
      }
      

          const Snake = ()=>{
            return (
              <>
                    <div className="text">
                    <h1 className="subheader">Snake</h1>
                    <p>One of the first non-trivial macros I created. In this modified snake game, players are asked a question and need to guide the snake to the correct answer </p>
                    <p>Questions can be easily customizable without any programming language, and can be both simple text or pictures.</p>
                    <img src ={SnakeImg} draggable="false" className="screenshot" alt="Snake" />
                    </div>

                    <div className="centerButtonContainer">
                    <Button variant="contained"><a style={{ "text-decoration":"none", color: '#000' }} href={ExcelSnake} download>Click to Download!</a></Button>
                    </div>
                    <br/>
            </>
          )
          }
         

        const Crossword = () =>{ 
          return(
          <>
                <div className="text">
                    <h1 className="subheader">Crossword</h1>
                    <p>A simple game put together in one day. Crossword questions are on the right, click the number next to the question to highlight the corresponding boxes on the crossword </p>
                    <br/>
                    <p>Answers can be checked by pressing the "Check Answers" button on the left. Correct answers will be highlighted in green</p>
                    <br/>
                    <img src ={CrosswordImg} className="screenshot" alt="Crossword" />
                    </div>
                    <div  className="centerButtonContainer">
                    <Button variant="contained"><a style={{ "text-decoration":"none", color: '#000' }} href={ExcelCrossword} download>Click to Download!</a></Button>
                </div>  
            </>
        )}
        const Other =()=>{ 
          return(
            <>
                <div className="text">
                    <h1 className="subheader">Other</h1>
                    <p>Throughout my internships, I of course, created more "normal" macros to automate tasks.
                       However, as the tasks performed by these macros were used to process confidential data, they are not available for download</p>           
                    <br/>
                    <p>Tasks Include:</p>
                    <ul className="circle">
                      <li>Automating the sending of personalized emails in Microsoft Outlook</li>
                      <li>Creating a form that would automatically generate a PowerPoint presentation when provided certain data</li>
                      <li>Automating the processing of financial stocks using VBA, reducing 1 month’s worth of manual work to less than 3 hours</li>
                      <li>Automatically processing data submiited from a Microsoft Form to be used by other programs</li>
                      <li>Parsing Excel data into a CSV for a Python program to read</li>
                      <br></br>
                    </ul>
                </div>
            </>
        )}


      

    return (
        //<TwoTables left={<Left/>} right={<Right />}></TwoTables>
        <>
          <div className="colouredHorizontalBlock0">
            <TechnologiesRoutes/>
          </div>
          <div className="colouredHorizontalBlock1">
            <IntroExcel/>
          </div>
          <div className="colouredHorizontalBlock2">
            <Snake/>
          </div>
          <div className="colouredHorizontalBlock3">
            <Crossword/>
          </div>
          <div className="colouredHorizontalBlock4">
            <Other/>
          </div>
        </>
    );
  }

  export default Excel