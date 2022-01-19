import './App.css';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom'

import React, {useState} from "react";
import HomePage from './component/HomePage';
import StartPage from './component/StartPage'
import GamePage from './component/GamePage';
import Login from './component/Login';
import Registration from './component/Registeration';
function App() {
  const [firstPlayer, updateFirstPlayer] = useState()
  const [secondPlayer, updateSecondPlayer] = useState()

  
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registeration" element={<Registration/>}/>
      <Route  path="/homepage" element={<HomePage updateFirstPlayer={updateFirstPlayer} updateSecondPlayer={updateSecondPlayer}/>} />
      <Route path="/startpage" element={<StartPage/>}/>
      <Route path="/gamepage" element={<GamePage firstPlayer={firstPlayer} secondPlayer={secondPlayer}/>}/>

      </Routes>

     </Router>
      
    </div>
  );
}

export default App;
