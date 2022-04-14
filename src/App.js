import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AboutMe from './pages/AboutMe';
import Technologies from './pages/Technologies';
import EncryptionPage from './pages/Encryption';
import Excel from './pages/Excel';
import Web from './pages/WebStuff';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Testing from './pages/Testing';



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
          <Route exact path='/Contact'  element={<Contact/>}/>
          <Route exact path='/Testing'  element={<Testing/>}/>

        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
