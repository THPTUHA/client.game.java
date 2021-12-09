import React from "react";
import UserProvider from "./context/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/pages/Nav";
import "./index.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App(){
  console.log("App");
  return (
    <UserProvider>
      <Router>
      <ToastContainer/>
        <Nav>
        </Nav>
      </Router>

    </UserProvider>
  );
}
export default App;
