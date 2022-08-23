import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useState } from "react";
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Routes,
  Link
} from "react-router-dom";
import SignUp from './components/signUp';
import axios from 'axios';

function App() {
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <Router> 
          <Routes>
            
            <Route path="/Signup" element={<SignUp />}>
              {/* <Login /> */}
            </Route>
            <Route path="/login" element={<Login />}>
              
            </Route>
            <Route path="/" 
            element={<ListTodo 
            />}>
            </Route>
          </Routes>
          
          
        </Router>
        
        
      </header>
    </div>
  );
}

export default App;
