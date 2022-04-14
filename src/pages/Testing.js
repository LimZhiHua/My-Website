import React, {useState, useEffect} from 'react';
import "../App.css"

import { TextField, Grid} from '@material-ui/core' ;

import {baseURL} from "../urls";

// Gonna try to make wordle
// Is a 6x6 grid.
function Testing() {

    const [testGet, setGet] = React.useState(null);
    const usl  = baseURL +  "/testAPI"
    
    const getAPI = async () => {
        const getURL = usl + '/getReq';
        console.log("getURl is", getURL)
        const resp = await fetch(getURL);
        console.log("resp is", resp)
        const respText =  await resp.text()
        console.log("Resp text is", respText)
        setGet(respText)
    };

    const postAPI = async () => {
        const postURL = usl + '/postReq';
        const randomData = {
            "a": 12345,
            "b": 45678
        }
        const request = {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(randomData),
          }
        const resp = await fetch(postURL, request);
        console.log("Post resposne is", resp)
        const postRes = await resp.text();
        console.log("Post res text is", postRes)
    };


    // <div>
    // <p style={{fontWeight:"bold", color:"white", fontSize:"30px", textAlign:"center"}}>This page is just for met to test random things</p>
    // <button onClick={ (e) => getAPI()}> getAPI</button>
    // <p> GetAPI got: {testGet} </p>
    // <button onClick={ (e) => postAPI()}>postAPI</button>
    // </div>         


    const values = [0,1,2,3,4,5,6]
    const gridItems =  values.map(value => {
        return (
            <Grid item key={value} xs={4}>
                <p>{value}</p>
            </Grid>
        )
    })
    return (
        <div className='horizontalBlock'> 
            {/* <Grid contaner spacing = {2}>
                <Grid item key={0} xs={4}>
                    <p>0</p>
                </Grid>
                <Grid item key={1} xs={4}>
                    <p>1</p>
                </Grid>
                <Grid item key={2} xs={4}>
                    <p>2</p>
                </Grid>
            </Grid> */}
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <p>xs=6 md=8</p>
            </Grid>
            <Grid item xs={6} md={4}>
                <p>xs=6 md=4</p>
            </Grid>
            <Grid item xs={6} md={4}>
                <p>xs=6 md=4</p>
            </Grid>
            <Grid item xs={6} md={8}>
                <p>xs=6 md=8</p>
            </Grid>
        </Grid>
        </div>     
    );
  }

  export default Testing