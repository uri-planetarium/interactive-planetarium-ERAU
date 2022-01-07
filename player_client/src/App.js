import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import JoinGame from "./components/joinGame/join_game";
import WaitForGame from "./components/waitForGame/wait_for_game";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JoinGame />}/>
                <Route path="/waiting" element={<WaitForGame />}/>
            </Routes>
        </Router>
    );
  }

  
export default App;
