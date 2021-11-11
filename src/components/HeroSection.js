import React from 'react';
import "../App.css"
import { LinkButton } from './LinkButton';
import './HeroSection.css';
//import video from "/videos/video-2.mp4"
function HeroSection() {
  return (
    <div className='hero-container'>
      {/*<video src={require("../videos/video-2.mp4")} autoPlay loop muted>
      </video>*/}

      <p>Why wont you work</p>
      <div className='hero-btns'>
        <LinkButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </LinkButton>

      </div>
    </div>
  );
}

export default HeroSection;