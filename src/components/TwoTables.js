import React from 'react';
import "../App.css"
import { LinkButton } from './LinkButton';
import Grid from '@material-ui/core/Grid';
import "./TwoTables.css"

//import video from "/videos/video-2.mp4"
function TwoTables(props) {
  return (
    <div className='hero-container'> 
      <Grid container spacing={2} className="table" >
          <Grid item xs={6} className="left" >
          {props.left}
          </Grid>
          <Grid item xs={6} className="right">
          {props.right}
        </Grid>
      </Grid>
      </div>
  );
}

export default TwoTables;