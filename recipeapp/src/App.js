//import { Typography } from '@mui/material';
import './App.css';
import AddCuisine from './Components/AddCuisine';
import Chines from './Components/Chines';
import Home from './Components/Home';
import Indian from './Components/Indian';
import Italian from './Components/Italian';
import Navbar from './Components/Navbar';
import {Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      
      
      <Routes basename="/">
        <Route path='/Recipe-App' element={<Home/>}></Route>
        <Route path='/Indian' element={<Indian/>}></Route>
        <Route path='/Chines' element={<Chines/>}></Route>
        <Route path='/Italian' element={<Italian/>}></Route>
        <Route path='/addcuisine' element={<AddCuisine/>}></Route>
        {/* <Route path='/post' element={}></Route> */}
      </Routes>
     
    </div>
    
  );
}

export default App;
