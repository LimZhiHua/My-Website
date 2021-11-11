import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables from '../components/TwoTables';
import Textbox from '../components/TextBox';
import "../App.css"
import { generateKeyPair, encryptFile, decryptFile } from '../components/Encryption';
import {Link} from "react-router-dom"
import { Button as MaterialButton, TextField, Box} from '@material-ui/core' ;
import { withStyles } from '@material-ui/core/styles';
import { saveAs } from 'file-saver';

export default function EncryptionPage() {
  const [publicKey, setPublicKey] = useState()
  const [privateKey, setPrivateKey] = useState()
  const [uploadedFile, setUploadedFile] = useState()
  const [encryptedFile, setEncryptedFile] = useState()

  const [iv, setIV] = useState()
  const [encAES, setEncAES] = useState()
  const [decryptedFile, setDecryptedFile] = useState()
  const fs = require('fs');
  
  //styling for materialui button
  const style = {
    button:{

    }
  }

  const generateKeys = async () => {
    const keys = await generateKeyPair();
    console.log("keys is", keys)
    setPublicKey(keys[0])
    setPrivateKey(keys[1])
    console.log("key")
  }

  const Left = ()=>{
    return(
      <>
        <h1 className="header"> Technologies I've Used!</h1>
        <Link to="/" className="hyperlink" >Home</Link>   
        <h1 className="subheader"> Description:</h1>
        <div className="text">
        <p> During my time as a Full Stack Developer at the University of Scarborough, I was tasked with implementing file encryption/decryption</p>
        <p> To accomplish this, I used a combination of RSA (asymmetric) and AES (symmetric) encryption.</p>
        <br/>
        <p> To try it out for yourself, perform the following steps:</p>
        <p> 1. Press the "Generate Key Pair" button to generate a public and private key pair</p>
        <p> 2. Upload the file you wish to encrypt using the "Upload File For Encryption" button</p>
        <p> 3. Copy the nonce/IV somewhere (this is some randomly generated data used to ensure everytime you encrypt an item, the output is different)</p>
        </div>

      </>
    ) 
  }
  const Right = ()=>{
    return(
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TwoTables left={<KeyLeft/>} right={<KeyRight/>} title="Generate Key Pair"></TwoTables>
          </Grid>
          <Grid item xs={12} align="center"  style={{verticalAlign:"top", display: "flex", justifyContent: "center" }} >
            <MaterialButton onClick={generateKeys} variant="contained">Generate Public/Private Keys</MaterialButton>
          </Grid>
          <Grid item xs={12}>
            <TwoTables left={<EncInfoLeft/>} right={<EncInfoRight/>} ></TwoTables>
          </Grid>
          <Grid item xs={12} align="center"  style={{verticalAlign:"top", display: "flex", justifyContent: "center" }} >
            <TwoTables left={<ButtonsLeft/>}right={<ButtonsRight/>}/>
          </Grid>
        </Grid>
      </>
    ) 
  }

  //-- these are just the boxes for the IV and encrypted AES key.
  const EncInfoLeft = () =>{
    return(
      <TextField  value={iv} fullWidth id="outlined-basic" label={"IV appears here"} variant="outlined" />
    )
  }

  const EncInfoRight = () =>{
    return(
      <TextField  value={encAES} fullWidth id="outlined-basic" label={"Encrypted AES key appears here"} variant="outlined" />
    )
  }

  //-----------this is for the displaying of public/private key and their boxes
  const KeyLeft = () =>{
    return(
      <Textbox value={publicKey} title="Public Key" label="Public Key Will Appear Here" maxRows={10} minRows={10}/>
    )
  }

  const KeyRight = () =>{
    return(
      <Textbox value={privateKey} title="Private Key" label="Private Key Will Appear Here" maxRows={10} minRows={10}/>
    )
  }

  
  const ButtonsLeft = ()=>{
    return (
      <>
        <Box m = {2}>
          <MaterialButton
              variant="contained"
              component="label"
            >
              Upload File for Encryption
              <input
                type="file"   
                hidden
                id="uploadFile"
                onChange={uploadFileForEncryption}
              />
          </MaterialButton>
        </Box>
        <Box m = {2}>
          <MaterialButton onClick={encryptUploadedFile} variant="contained">Encrypt File</MaterialButton>
        </Box>
        <Box m = {2}>
          <MaterialButton onClick={downloadEncryptedFile} variant="contained">Download Encrypted File</MaterialButton>
        </Box>
      </>
    )
  }

  const ButtonsRight = () =>{
    return(
      <>
        <Box m = {2}>
          <MaterialButton
              variant="contained"
              component="label"
            >
              Upload File for Decryption
              <input
                type="file"   
                hidden
                id="uploadFile"
                onChange={uploadFileForDecryption}
              />
          </MaterialButton>
        </Box>
        <MaterialButton onClick={decryptEncryptedFile} variant="contained">Decrypt Encrypted File</MaterialButton>

         <MaterialButton onClick={downloadDecryptedFile} variant="contained">Download Decrypted File</MaterialButton>
      </>
    )
  }

  //--------for handling encryption/decryption of the files
  const encryptUploadedFile = async () => {
    const data = ( await encryptFile(uploadedFile, publicKey))
    setEncryptedFile(data.fileData)
    console.log("file data is", data.fileData)
    setIV(data.iv)
    setEncAES(data.aesKey)

    
  }

  const decryptEncryptedFile = async () => {
    const data = ( await decryptFile(encryptedFile, privateKey, iv, encAES))
    setDecryptedFile(data)
  }
  const uploadFileForEncryption = (event) => {
   setUploadedFile(event.target.files[0])
   
  }

  const uploadFileForDecryption = async (event) => {
   const file = event.target.files[0]

   var arrayPromise = new Promise(function(resolve) {
    var reader = new FileReader();

    reader.onloadend = function() {
        resolve(reader.result);
      };

      reader.readAsArrayBuffer(file);
    });

  arrayPromise.then(function(array) {
    var uint8Array = new Uint8Array(array)
    console.log("dec file data is", uint8Array)
    setEncryptedFile(uint8Array)
  });

  }

  
  const downloadEncryptedFile = ()=>{
    //saveAs(uploadedFile, "hello.jpg")
    const blob = new Blob([encryptedFile]);
    saveAs(blob, "hello2.jpg")

      console.log("encrypted data is is", encryptedFile);
  
  }

  const downloadDecryptedFile = () =>{
    console.log(decryptedFile)
    var blob = new Blob([decryptedFile.fileData]);
    saveAs(blob, "hello2.jpg")

  }



    return (
      <div className='hero-container'> 
        <TwoTables left={<Left/>} right={<Right/>} ></TwoTables>
        </div>
    );


}

