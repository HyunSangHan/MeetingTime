import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Footer from "./components/Footer";
import Profile from "./components/details/Profile";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App frame">
                <Route exact path="/" component={Main}/>
                <Footer/>
                <Route path="/profile" component={Profile}/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
