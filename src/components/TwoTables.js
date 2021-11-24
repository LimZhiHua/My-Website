import React from 'react';
import "../App.css"
import Grid from '@material-ui/core/Grid';
import "./TwoTables.css"

function TwoTables(props) {
  return (
      <Grid container spacing={0} className="table" >
          <Grid item xs={6} className="left" >
          {props.left}
          </Grid>
          <Grid item xs={6} className="right">
          {props.right}
        </Grid>
      </Grid>
  );
}

export default TwoTables;