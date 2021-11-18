import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AboutMe from './pages/AboutMe';
import Technologies from './pages/Technologies';
import EncryptionPage from './pages/Encryption';
import Excel from './pages/Excel';
import Web from './pages/WebStuff';
import Resume from './pages/Resume';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/'  element={<AboutMe/>}/>
          <Route exact path='/Technologies'  element={<Technologies/>}/>
          <Route exact path='/Encryption'  element={<EncryptionPage/>}/>
          <Route exact path='/Excel'  element={<Excel/>}/>
          <Route exact path='/Web'  element={<Web/>}/>
          <Route exact path='/Resume'  element={<Resume/>}/>


        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
