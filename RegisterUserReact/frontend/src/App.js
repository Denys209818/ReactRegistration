import React from "react";
import {BrowserRouter as Router,
Route,
Switch} from 'react-router-dom'
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import RegisterComponent from "./components/Register";

function App() {
  return (
  <Router>
      <Navbar/>

      <Switch>
        <Route exact path="/">
          <div className="container">
            <h1>Головна сторінка</h1>
          </div>
        </Route>
        <Route exact path="/register">
          <RegisterComponent/>
        </Route>
      </Switch>
  </Router>  
  );
}

export default App;
