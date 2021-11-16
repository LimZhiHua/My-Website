import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TwoTables from '../components/TwoTables';
import Textbox from '../components/TextBox';
import "../App.css"
import { generateKeyPair, encryptFile, decryptFile } from '../components/Encryption';
import {Link} from "react-router-dom"
import { Button as MaterialButton, TextField, Box} from '@material-ui/core' ;
import { saveAs } from 'file-saver';

import TechnologiesRoutes from '../components/TechnologiesRoutes';


export default function EncryptionPage() {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [uploadedFile, setUploadedFile] = useState()
  const [encryptedFile, setEncryptedFile] = useState()
  const [encFileName, setEncFileName] = useState('')

  const [iv, setIV] = useState('')
  const [encAES, setEncAES] = useState('')
  const [decryptedFile, setDecryptedFile] = useState()
  const [decFileName, setDecFileName]   = useState('')

  const generateKeys = async () => {
    const keys = await generateKeyPair();
    setPublicKey(keys[0])
    setPrivateKey(keys[1])
    console.log("key")
  }

  const Left = ()=>{
    return(
      <>
        <TechnologiesRoutes/>
        <div className="text">
        <h1 className="subheader">Description:</h1>
        <p> During my time as a Full Stack Developer at the University of Scarborough, I was tasked with implementing file encryption/decryption</p>
        <p> To accomplish this, I used a combination of RSA (asymmetric) and AES (symmetric) encryption.</p>
        <br/>

        <h1 className="subheader"> Try it out for yourself!</h1>
        <p> 1. Press the "Generate Key Pair" button to generate a public and private key pair</p>
        <p> (Alternatively, you can generate a <b>RSA 2048 bit</b> public/private key pair from some other site and paste it in)</p>
        <p> 2. Upload the file you wish to encrypt using the "Upload File For Encryption" button</p>
        <p> 3. Copy the IV somewhere (this is some randomly generated data used to ensure everytime you encrypt an item, the output is different)</p>
        <br/>
        <h1 className="subheader"> How it Works:</h1>
        <p> <b>Public/Private Key:</b>The public key is used to encrypt data, and can be freely distributed. Meanwhile, the private key is used to decrypt data encrypted by the public key, and should only be available to specific people</p>
        <p> <b>IV:</b> The IV is some randomly generated data added to the data, used to ensure that encrypted data will always be different even when encrypting the same thing multiple times. This value changes everytime you perform encryption</p>
        <p> <b>Encrypted AES Key:</b>Everytime our program encrypts a file, it generates a random AES key to encrypt the data, and then encrypts the key with public/private key encryption. This is because public/private key encryption is slower and is usually only done on small amounts of data</p>
        <br/>
        <h1 className="subheader"> Technical Details:</h1>
        <p><b>Asymmetric Encryption Used:</b> 2048 bit RSA-OAEP</p>
        <p><b>Symmetric Encryption Used:</b>AES-GCN </p>
        <p><b>IV Length:</b>16 Bytes</p>
        <p><b>Source Code:</b><a href="https://github.com/LimZhiHua/My-Website/blob/master/src/components/Encryption.js"> https://github.com/LimZhiHua/My-Website/blob/master/src/components/Encryption.js</a></p>

        </div>

      </>
    ) 
  }
  const Right = ()=>{
    return(
      <>
        <Grid container spacing={2} key="EncryptionRightGrid">
          <Grid item xs={12} key="Generate Table Row">
          <TwoTables key="generateKeyTable"left={<KeyLeft/>} right={<KeyRight/>} title="Generate Key Pair"></TwoTables>
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
      <TextField onChange={settingIV} auto value={iv} fullWidth  label={"IV appears here"} variant="outlined" />
    )
  }

  const EncInfoRight = () =>{
    return(
      <TextField onChange={settingEncAES} value={encAES} fullWidth  label={"Encrypted AES key appears here"} variant="outlined" />
    )
  }


  //-----------this is for the displaying of public/private key and their boxes
  const KeyLeft = () =>{
    return(
      <Textbox onChange={settingPublicKey} value={publicKey} title="Public Key" label="Public Key Will Appear Here" maxRows={10} minRows={10}/>
      //<TextField key="iv textfield" value={publicKey} multiline maxRows={10} minRows={10}  label={"Public Key Will Appear Here"} variant="outlined" />

    )
  }

  const KeyRight = () =>{
    return(
      <Textbox onChange={settingPrivateKey} value={privateKey} title="Private Key" label="Private Key Will Appear Here" maxRows={10} minRows={10}/>
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
        <Box m = {2}>
        <MaterialButton onClick={decryptEncryptedFile} variant="contained">Decrypt Encrypted File</MaterialButton>
        </Box>
        <Box m = {2}>
         <MaterialButton onClick={downloadDecryptedFile} variant="contained">Download Decrypted File</MaterialButton>
         </Box>

      </>
    )
  }

  //--------for handling encryption/decryption of the files
  const encryptUploadedFile = async () => {
    let errorMessage = ""
    if(uploadedFile === undefined){
      errorMessage += "Please upload the file you wish to encrypt\n"
    }

    if(publicKey === ""){
      errorMessage+= "Please generate a public and private key pair"
    }
    if(errorMessage.length === 0){
      try{
        const data = ( await encryptFile(uploadedFile, publicKey))
        setEncryptedFile(data.fileData)
        setEncFileName(data.fileName)
        setIV(data.iv)
        setEncAES(data.aesKey)
        window.alert("File has been successfully encrypted and is ready do be downloaded")
      }catch(err){
        window.alert("An error occured when attempting to encrypt the file")
      }
    }else{
      window.alert(errorMessage)
    }
    
  }

  const decryptEncryptedFile = async () => {
    let errorMessage = ""
    if(encryptedFile === undefined){
      errorMessage += "Please upload the file you wish to decrypt\n"
    }

    if(privateKey=== ""){
      errorMessage+= "Please ensure that you have a private key\n"
    }

    if(iv ===""){
      errorMessage+= "Please paste the iv used when encrypting the file in the IV box \n" 
    }

    if(encAES===""){
      errorMessage+= "Please paste the encrypted AES key used when encrypging the file"
    }

    if(errorMessage.length === 0){
      try{
        const data = ( await decryptFile(encryptedFile, privateKey, iv, encAES))
        setDecryptedFile(data)
        window.alert("Press the download button to download the decrypted file!")
      }catch(err){
        window.alert("An error occured when attempting to decrypt the file")
      }
    }else{
      window.alert(errorMessage)
    }
   
  }
  const uploadFileForEncryption = (event) => {
   setUploadedFile(event.target.files[0])
   
  }

  const uploadFileForDecryption = async (event) => {
   const file = event.target.files[0]
   setDecFileName(file.name)
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
    saveAs(blob, encFileName)  
  }

  const downloadDecryptedFile = () =>{
    console.log(decryptedFile)
    var blob = new Blob([decryptedFile.fileData]);
    saveAs(blob, decFileName)

  }

  // these are just so users can pate their own iv/keys in
  const settingPublicKey = (event)=>{
    setPublicKey(event.target.value)
  }

  const settingPrivateKey = (event) =>{
    setPrivateKey(event.target.value)
  }

  const settingIV = (event) =>{
    setIV(event.target.value)
  }

  const settingEncAES = (event)=>{
    setEncAES(event.target.value)
  }
    return (
      <div > 
        <TwoTables key="encryptionPage"left={<Left key="encryptionLeft"/>} right={<Right key="encryptionRight"/>} ></TwoTables>
        </div>
    );


}

