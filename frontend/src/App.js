import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionView from './components/TransactionView';
import About from './pages/About';
import MainApp from './pages/MainApp'
import EditTransaction from './pages/EditTransaction'
//import LoginButton from './components/LoginButton'
//import LogoutButton from './components/LogoutButton'
//import { gapi } from 'gapi-script'

//const clientId = "179439514600-011uh459lu4jlh6pt63bd3rbh6ns2d7s.apps.googleusercontent.com"


function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/" exact element = {<MainApp/>}/>
          <Route path="/user/:username/transaction/:transaction_id" element = {<EditTransaction/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
