import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import AboutMe from './pages/AboutMe';
import Technologies from './pages/Technologies';
import EncryptionPage from './pages/Encryption';
import Excel from './pages/Excel';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/'  element={<Home/>}/>
          <Route exact path='/AboutMe'  element={<AboutMe/>}/>
          <Route exact path='/Technologies'  element={<Technologies/>}/>
          <Route exact path='/Encryption'  element={<EncryptionPage/>}/>
          <Route exact path='/Excel'  element={<Excel/>}/>


        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
