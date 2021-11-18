import React, {useState} from 'react';
import "../App.css"
import ResumePDF from "../files/Resume.pdf"

  function Resume() {

      return (
        <div style={{ width: "100%", height: "100vh" }}>
        <iframe
                style={{ width: "100%", height: "100%" }}
                src={ResumePDF}
                type='application/pdf'
                title='title'
              />
            </div>
      );
    }
  


  export default Resume