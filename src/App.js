import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useEffect, useState } from "react";
import Login from './components/Login';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Routes,
  Link,
  useNavigate,
  BrowserRouter,
  Navigate,
  Outlet
} from "react-router-dom";
import SignUp from './components/signUp';

// function Splash() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('token: ', token)

//     if (!token) {
//       navigate('/login', { replace: true });


//     } else {
//       navigate('/todo', { replace: true });
//     }
//   }, []);

// };

const ProtectedRoute = ({
  token,
  redirectPath = '/login',

}) => {
  if (!token) {
    console.log(token)
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

function App() {

  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <header className="App-header">

        <Routes>
          <Route element={<ProtectedRoute token={!!token} />}>
            <Route path="/" element={<ListTodo />} />
            <Route path="/todo" element={<ListTodo />} />
          </Route>

          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/todo"
            element={<ListTodo />} /> */}


          {/* <Route path="/user" element={<Splash />}>
              <Route path=":id" element={<Splash />} />
            </Route> */}
        </Routes>





      </header>
    </div>
  );
}

export default App;
