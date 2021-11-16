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
    const [index, setIndex] = useState()

    const Left = ()=>{
        return(
          <>
            <TechnologiesRoutes/>
              <div className="text">
              <h1 className="subheader">Description:</h1> 
              <p> During my time at Schneider Electric as a Data Analyst/IT Intern, I had the chance to teach myself Visual Basics for Applications (VBA), a programming language that can easily interact with Microsoft products such as Excel, Access, or Outlook </p>
              <br/>
              <p> While I did create many "normal" macros to automate more conventional tasks such as processing data or sending emails, I also had the opportunity to create a few simple games in VBA</p>
              <br/>
              <p> One of the tasks assigned to me was to "gamify" the learning experience for some training data. To accomplish this goal, I created educational games which could be played by anyone with Microsoft Excel</p>
              <p> Some examples of this can be seen on the right.</p>
      
              <br/>
      
              </div>
          </>
        ) 
      }
      
      // These styles are just for the slider.
    
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

          const Snake =(
              <>
                    <h1 className="header">Snake</h1> 
                    <div className="text">
                    <h1 className="subheader">Description:</h1>
                    <p>One of the first non-trivial macros I created. In this modified snake game, players are asked a question and need to guide the snake to the correct answer </p>
                    <p>Questions can be easily customizable without any programming language, and can be both simple text or pictures.</p>
                    <img src ={SnakeImg} className="screenshot" alt="Snake" />
                    </div>

                    <div style={{justifyContent: "center", justifySelf:"center", display:"flex"}}>
                    <Button variant="contained"><a style={{ "text-decoration":"none", color: '#000' }} href={ExcelSnake} download>Click to Download!</a></Button>
                    </div>

                    <h1 className="footer">Swipe to See More!<i class="fas fa-arrow-right"></i> </h1>
                    <br/>
            </>
          )

        const Crossword =(
          <>
                <div className="text">
                    <h1 className="subheader">Crossword</h1>
                    <p>A simple game put together in one day. Crossword questions are on the right, click the number next to the question to highlight the corresponding boxes on the crossword </p>
                    <br/>
                    <p>Answers can be checked by pressing the "Check Answers" button on the left. Correct answers will be highlighted in green</p>
                    <br/>
                    <img src ={CrosswordImg} className="screenshot" alt="Crossword" />
                    </div>
                    <div style={{justifyContent: "center", justifySelf:"center", display:"flex"}}>
                    <Button variant="contained"><a style={{ "text-decoration":"none", color: '#000' }} href={ExcelCrossword} download>Click to Download!</a></Button>
                    </div>
                    <h1 className="footer"><i class="fas fa-arrow-left"/>Swipe to See More!<i class="fas fa-arrow-right"></i> </h1>
                    <br/>  
            </>
        )
        const Other = (
                <div className="text">
                    <h1 className="subheader">Other:</h1>
                    <p> </p>
            
                    <br/>
          </div>
        )
        const slides = [
            {
                value: Snake,
                style: swiperStyles.slide1}, 
            {
                value:Crossword,
                style: swiperStyles.slide2
            },
            {
                value: Other,
                style: swiperStyles.slide3
            }]


        return(
          <>
             <Swiper styles={swiperStyles} slides={slides} />
      
          </>
        ) 
      }
      

    return (
      <div className='hero-container'> 
        <TwoTables left={<Left/>} right={<Right />}></TwoTables>
        </div>
    );
  }

  export default Excel