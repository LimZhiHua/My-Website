import React, {useState, useEffect} from 'react';
import "../App.css"
import "./Testing.css"

import { TextField, Grid} from '@material-ui/core' ;

import CharacterTextField from '../components/CharacterTextField';
import {baseURL} from "../urls";

// Gonna try to make wordle
// Is a 6x6 grid.
function Testing() {

    const [testGet, setGet] = useState(null);
    const [curRow, setCurRow] = useState(0);
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

    
    const rows = 5;
    const cols = 6

    // This just generates an array with equal size to the number of items
    const values = Array.from(Array(rows * cols).keys())

    const calculateDisabled = (index) => {
        // we disable him if he is not on our current row
        // currentRow's indexes can be calculated by going:
        const startInd = (curRow * cols)
        return !( startInd <= index )&& ( index <= (startInd + cols))
    }

    const nextRow = () => {
        setCurRow(curRow + 1)
        console.log("currow is", curRow)
    }
    
    const gridItems = values.map(value => {
        return (
            <Grid item xs={2}  className='gridItem'>
                <CharacterTextField disabled={calculateDisabled(value)} value={value}/>
            </Grid>
        )
    })
    return (
        <div className='horizontalBlock '> 
        <div className='centerDisplay'>
            <Grid container spacing={1} className='gridContainer'>
                {gridItems}
            </Grid>
        </div>
        <button onClick={nextRow}>this is a button</button>
        </div>     
    );
  }

  export default Testing