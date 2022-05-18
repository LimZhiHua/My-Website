/* TODO
> Change background colouring logic from CharacterTextField.js to the parent
> Generate a random answer
> Save the answers in a cookie for a day
> Allow for a custom number of columns
> Allow for a custom word list
> Change the name from Testing to Wordle or something

*/

import React, { useState, useEffect } from "react";
import "../App.css";
import "./Testing.css";

import { TextField, Grid } from "@material-ui/core";

import CharacterTextField from "../components/CharacterTextField";
import { baseURL } from "../urls";

import wordList from "../files/wordList.txt";
// Gonna try to make wordle
// Is a 6x6 grid.
function Testing() {
  const [testGet, setGet] = useState(null);

  const [curRow, setCurRow] = useState(0);

  const [wordSet, setWordSet] = useState();

  const [inputWord, setInputWord] = useState("");
  const [validWord, setValidWord] = useState(true);
  const [success, setSuccess] = useState(false);

  const usl = baseURL + "/testAPI";

  const [answer, setAnswer] = useState("tired");

  // I might eventually change it to get the info from a database.
  /*
  const getAPI = async () => {
    const getURL = usl + "/getReq";
    console.log("getURl is", getURL);
    const resp = await fetch(getURL);
    console.log("resp is", resp);
    const respText = await resp.text();
    console.log("Resp text is", respText);
    setGet(respText);
  };

  const postAPI = async () => {
    const postURL = usl + "/postReq";
    const randomData = {
      a: 12345,
      b: 45678,
    };
    const request = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(randomData),
    };
    const resp = await fetch(postURL, request);
    console.log("Post resposne is", resp);
    const postRes = await resp.text();
    console.log("Post res text is", postRes);
  };
  */

  // <div>
  // <p style={{fontWeight:"bold", color:"white", fontSize:"30px", textAlign:"center"}}>This page is just for met to test random things</p>
  // <button onClick={ (e) => getAPI()}> getAPI</button>
  // <p> GetAPI got: {testGet} </p>
  // <button onClick={ (e) => postAPI()}>postAPI</button>
  // </div>

  const rows = 7;
  const cols = 5;
  // 50 is just the size of each cell
  const width = 50 * cols;

  // This just generates an array with equal size to the number of items
  const values = Array.from(Array(rows * cols).keys());

  const calculateDisabled = (index) => {
    // we disable him if he is not on our current row
    // startInd tells me the 1st index of the row.
    const startInd = curRow * cols;
    return !(startInd <= index && index < startInd + cols);
  };

  const calculateSubmitted = (index) => {
    // A grid item has been submitted if we have gone past his index.
    const startRow = Math.floor(index / cols);
    return startRow < curRow;
  };

  const checkWord = (input) => {
    const word = getSubmittedWord();
    if (word.toUpperCase() === answer.toUpperCase()) {
      // well, he got the answer.
      setSuccess(true);
      return true;
    }
    const valid = wordSet.has(word.toLowerCase());
    setValidWord(valid);
    return valid;
  };

  const nextRow = (e) => {
    console.log("answer is", answer);
    e.preventDefault();
    if (checkWord()) {
      setCurRow(curRow + 1);
    }
  };

  const generateWordSet = async () => {
    const response = await fetch(wordList);
    const words = new Set(
      (await response.text()).split("\n").map((item) => item.trim())
    );
    setWordSet(words);
    const arrayWords = Array.from(words);
    setAnswer(arrayWords[Math.floor(Math.random() * arrayWords.length)]);
  };

  const getSubmittedWord = () => {
    const startInd = curRow * cols;
    let word = "";
    for (let i = startInd; i < startInd + cols; i++) {
      word += document.getElementById("field" + i).value;
    }
    setInputWord(word);
    return word;
  };

  useEffect(() => {
    generateWordSet();
  }, []);

  //   useEffect(() => {
  //     generateWordSet();
  //   }, [inputWord]);

  const gridItems = values.map((value) => {
    return (
      <Grid item className="gridItem" key={value}>
        <CharacterTextField
          disabled={calculateDisabled(value) || success}
          submitted={calculateSubmitted(value)}
          value={value}
          answer={answer}
          index={value % cols}
        />
      </Grid>
    );
  });

  const errorMessage = () => {
    if (validWord) {
      return <></>;
    } else {
      return (
        <h3 className="red centerButtonContainer">
          {inputWord} is not a valid word
        </h3>
      );
    }
  };

  const successMessage = () => {
    if (success) {
      return <h3 className="green centerButtonContainer">Congrats!</h3>;
    } else {
      return <></>;
    }
  };

  return (
    <div className="horizontalBlock ">
      <form>
        <div className="centerButtonContainer">
          <h2>Budget Wordle</h2>
        </div>
        <div style={{ width: width + "px" }}>
          <Grid container spacing={1} className="gridContainer">
            {gridItems}
          </Grid>
        </div>
        {errorMessage()}
        {successMessage()}
        <div className="centerButtonContainer">
          <button onClick={nextRow}>Submit</button>
        </div>
      </form>
      {/* <button onClick={reset}>reset button</button> */}
    </div>
  );
}

export default Testing;
