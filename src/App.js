import React, { Component } from 'react';
import './App.css';

import Recipes from './components/Recipes.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Recipes />
      </div>

    );
  }
}

export default App;
