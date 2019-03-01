import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Footer from "./components/Footer";
import Profile from "./components/details/Profile";
import Heart from "./components/details/Heart";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App frame">
                <Route exact path="/" component={Main}/>
                <Route path="/profile" component={Profile} title={"Profile"}/>
                <Route path="/heart" component={Heart} title={"하트 구매하기"}/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
