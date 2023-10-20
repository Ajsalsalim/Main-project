import React,{Fragment} from 'react';
import {Route,Routes} from "react-router-dom"
import User from './Routes/User';
import './App.css';
import Common from './Routes/Common';
import Admin from './Routes/Admin';
import Worker from './Routes/Worker';



function App() {
  return (
  <Fragment>
    <div className="App">
      <Routes>
      <Route path="/*" element={<Common/>}/>
      <Route path="/admin/*" element={<Admin/>}/>
      <Route path="/user/*" element={<User/>}/>
      <Route path="/worker/*" element={<Worker/>}/>



      </Routes>
    </div>
  </Fragment>
        
  )
}

export default App;
