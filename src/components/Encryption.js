
//---------------this section is for generating the public/private keys----------------
export const generateKeyPair = async (  )=> {
    var RSAKey = await generateRSA();
    var pubKey = await exportRSAPubKey(RSAKey.publicKey)
    var privKey = await exportRSAPrivKey(RSAKey.privateKey)
    var PEM = await spkiToPEM(pubKey, true)
    var PEM2 = await spkiToPEM(privKey, false)
    
    const keys = []
    keys.push(PEM)
    keys.push(PEM2)
    return keys
  }
  const generateRSA = async () => {
    var key = await window.crypto.subtle.generateKey(
      {
          name: "RSA-OAEP",
          modulusLength: 2048, //can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: {name: "SHA-1"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["wrapKey", "unwrapKey"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
  )  
    return key;
  }
  const exportRSAPubKey = async (tgtKey) => {
    var key = await window.crypto.subtle.exportKey(
      "spki", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      tgtKey //can be a publicKey or privateKey, as long as extractable was true
  )
    return key;
  }
  
  const exportRSAPrivKey = async (tgtKey) => {
    var key = await window.crypto.subtle.exportKey(
      "pkcs8", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      tgtKey //can be a publicKey or privateKey, as long as extractable was true
  )
    return key;
  }
  
  const spkiToPEM = (keydata, pub) => {
    var keydataS = arrayBufferToString(keydata);
    var keydataB64 = window.btoa(keydataS);
    var keydataB64Pem = formatAsPem(keydataB64, pub);
    return keydataB64Pem;
  }
  
  const arrayBufferToString = ( buffer )=> {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
  }

  const formatAsPem = (str, pub =true) => {
    var finalString =''
    if(pub){
        finalString +='-----BEGIN PUBLIC KEY-----\n'
    }else{
        finalString +=  '-----BEGIN PRIVATE KEY-----\n'
    } ;
  
    while(str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }
  
    if(pub){
        finalString +='-----END PUBLIC KEY-----'
    }else{
        finalString +=  '-----END PRIVATE KEY-----'
    } ;
  
    return finalString;
  }


  //--------------- this is for actually encrypting the file----------------

  // Generates a random AES key, encrypts the file with it, and then encrypts the AES key with the public RSA key.
  // returns this info
  export const encryptFile = async (file, publicKey) =>{
    var convArr = await readFileAsync( file)

    // just gotta make sure to format it properly 1st
    const pubKey = await getPublicKey(publicKey)

    // iv and key are required for AES encryption/decryption
    let iv = window.crypto.getRandomValues(new Uint8Array(16))
    let key = window.crypto.getRandomValues(new Uint8Array(32))

    //crypto functions are wrapped in promises so we have to use await and make sure the function that
    //contains this code is an async function
    const key_encoded = await crypto.subtle.importKey(  "raw",    key.buffer,   'AES-GCM' ,  false,   ["encrypt", "decrypt"]).catch((err) => {
      console.log(err)
      return Promise.reject('Something went wrong when trying to create the AES key')
    });
    const encryptedArr = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv:iv,
          length: 128
        },
        key_encoded, // the key encoded from our randomly generated data
        convArr     // the data
      ).catch( (err) => {
        console.log(err)
        return Promise.reject(`Something went wrong when trying to encrypt ${file.name}`)
      });
    
      console.log("key_encoded is", key_encoded)
     // We need to save the file, IV, AES key, and group data.
     // Encrypt the AES key with the public RSA one before saving it.    
    let encAES = await window.crypto.subtle.encrypt({name: 'RSA-OAEP'}, pubKey, key).catch( (err) => {
      return Promise.reject(`Something went wrong when trying to encrypt the AES key for file ${file.name}`)
    });
      // create a dictionary to contain our file info.
      const item = {
        fileName:file.name,
        fileData: Buffer.from(encryptedArr),
        iv: arrayBufferToBase64(iv),
        aesKey: arrayBufferToBase64(encAES), 
      }



      return item
      
     //return item
  }

  export const decryptFile = async (file, privateKey, ivEncoded, encryptedAES) => {
    
    console.log("----------decrypting file!!!!!!---------------", file)
    //-- lets see if we can figure out decryption too lol.
    const privKey = await  getPrivateKey(privateKey)
    const encAES = base64StringToArrayBuffer(encryptedAES)
    const iv = base64StringToArrayBuffer(ivEncoded)
    // first, we decrypt the AES key.
    let decAES = await window.crypto.subtle.decrypt({name: 'RSA-OAEP'},  privKey, encAES).catch( (err) => {
      return Promise.reject(`Something went wrong when trying to decrypt the AES key for file ${file.name}`)
    });
    const key_encoded = await crypto.subtle.importKey(  "raw",    decAES,   'AES-GCM' ,  false,   ["encrypt", "decrypt"]).catch((err) => {
      console.log(err)
      return Promise.reject('Something went wrong when trying to create the AES key from the data')
    });    // then we decrypt the file data
 
    const decryptedArr = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv:iv,
        length: 128
      },
      key_encoded, 
      file
    ).catch( (err) => {
      console.log(err)
      return Promise.reject(`Something went wrong when trying to decrypt ${file.name}`)
    });
    
    const item2 = {
      fileName:file.name,
      fileData: Buffer.from(decryptedArr),
      iv: arrayBufferToBase64(iv),
      aesKey: arrayBufferToBase64(encAES), 
    }
    return item2
    

}




  const arrayBufferToBase64 = ( buffer )=> {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    })
  }

  const getPublicKey = async (publicKey) => {
    // get public key
    const key = await window.crypto.subtle.importKey(
      'spki',
      convertPemToBinary(publicKey),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-1',
  
      },
      true,
      ['encrypt']
    );
  
    return(key)
  }

  const getPrivateKey = async (privateKey) => {
    // get public key
    const key = await window.crypto.subtle.importKey(
      'pkcs8',
      convertPemToBinary(privateKey),
      {
        name: 'RSA-OAEP',
        hash: 'SHA-1',
  
      },
      true,
      ['decrypt']
    );
    
    return(key)
  }

  const convertPemToBinary = (pem) => {
    var lines = pem.split('\n');
    var encoded = '';
    for (var i = 0; i < lines.length; i++) {
      if (
        lines[i].trim().length > 0 &&
        lines[i].indexOf('-BEGIN PRIVATE KEY-') < 0 &&
        lines[i].indexOf('-BEGIN PUBLIC KEY-') < 0 &&
        lines[i].indexOf('-END PRIVATE KEY-') < 0 &&
        lines[i].indexOf('-END PUBLIC KEY-') < 0
      ) {
        encoded += lines[i].trim();
      }
    }
    return base64StringToArrayBuffer(encoded);
    //return newencoded
  };

  const base64StringToArrayBuffer = (b64str) => {
    var byteStr = atob(b64str);
    var bytes = new Uint8Array(byteStr.length);
    for (var i = 0; i < byteStr.length; i++) {
      bytes[i] = byteStr.charCodeAt(i);
    }
    return bytes.buffer;
  };

