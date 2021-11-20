import React from "react";
import UserProvider from "./context/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/pages/Nav";

function App(){
  console.log("App");
  return (
    <UserProvider>
      <Router>
        <Nav>
        </Nav>
      </Router>
    </UserProvider>
  );
}
export default App;
