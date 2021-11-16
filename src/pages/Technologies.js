import React from 'react';

import TwoTables
 from '../components/TwoTables';
import "../App.css"
import TechnologiesRoutes from '../components/TechnologiesRoutes';


const Left = ()=>{  
  return(
    <>
     <TechnologiesRoutes/>

    </>
  ) 
}

const Right = ()=>{
  return(
    <>
    </>
  ) 
}


function Technologies() {
    return (
      <div className='hero-container'> 
        <TwoTables left={<Left/>} right={<Right/>}></TwoTables>
        </div>
    );
  }

  export default Technologies