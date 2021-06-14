import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React, {Fragment} from "react"

import Login from "./components/auth/Login"
import Register from "./components/auth/Register.js"

import AuthState from "./context/auth/AuthState"
import AlertState from "./context/alert/AlertState"
import ConferenceState from "./context/conference/ConferenceState"
import PapersState from "./context/papers/PapersState"
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PrivateRoute from './components/routing/PrivateRoute'
import ReviewPage from './components/pages/ReviewPage';
import SectionPage from './components/pages/SectionPage'



function App() {
  return (
      <AuthState>
        <ConferenceState>
          <AlertState>
            <PapersState>
              <Router>
                <Fragment>
                  <Navbar/>
                  <div className="container">
                    <Alerts/>
                    <Switch>
                      <PrivateRoute exact path="/" component={Home}/>
                      <PrivateRoute exact path="/review" component={ReviewPage}/>
                      <Route exact path="/section" component={SectionPage}/>
                      <Route exact path="/about" component={About}/>
                      <Route exact path="/register" component={Register}/>
                      <Route exact path="/login" component={Login}/>
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </PapersState>
          </AlertState>
        </ConferenceState>
      </AuthState>
  );
}

export default App;