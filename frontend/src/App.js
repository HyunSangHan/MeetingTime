import React, { Component } from "react"
import "./App.css"
import Main from "./components/Main"
import Profile from "./components/Profile"
import TeamProfile from "./components/TeamProfile"
import Initpage from "./components/Initpage"
import Waiting from "./components/Waiting"
import CounterPlayer from "./components/details/CounterPlayer"
import { BrowserRouter, Route } from "react-router-dom"
import axios from "axios"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Waiting} />
          <Route path="/init" component={Initpage} />
          <Route path="/matching" component={Main} />
          <Route path="/profile" component={Profile} />
          <Route path="/team_profile" component={TeamProfile} />
          <Route path="/matching_result" component={CounterPlayer} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
