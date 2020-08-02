import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form
          type='registration'
        />
      </header>
    </div>
  );
}

export default App;
