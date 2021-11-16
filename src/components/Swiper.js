import React, { useState } from 'react';
import "../App.css"
import SwipeableViews from 'react-swipeable-views';


// Take in styles, take in an array of things to display.
export default function Swiper(props) {
    const [index, setIndex] = useState()

    const styles =  props.styles
    
    
      const handleStepChange = (step) => {
        setIndex(step);
      };
    
      /*<SwipeableViews 
            index={index}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
      <div style={Object.assign({}, styles.slide, styles.slide1)}>
          slide n°1
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
          slide n°2
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          slide n°3
        </div>
        </SwipeableViews> 

      */
    
    return(
      <>
        <SwipeableViews 
            index={index}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
            {
                props.slides.map(slide =>{
                    return (
                        <div style={Object.assign({}, styles.slide, slide.style )}>
                            {slide.value}
                        </div>
                    )
                })
            }

        </SwipeableViews>
        
      </>
    )

}

