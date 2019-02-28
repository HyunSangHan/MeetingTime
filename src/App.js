import React, { Component } from 'react';
import './App.css';
import Header from "./components/header";
import Main from "./components/main"

class App extends Component {
  render() {
    return (
      <div className="App frame">
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
