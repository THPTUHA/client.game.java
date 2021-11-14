import React from "react";
import Main from "./components/Main";
import UserProvider from "./context/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";

function App(){
  console.log("App");
  return (
    <UserProvider>
      <Router>
        <Main/>
      </Router>
    </UserProvider>
  );
}
export default App;
