import React from 'react';
import Button from "./components/Button"
import DogBreeds from "./components/DogBreeds"
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Getting started with React testing</h2>
      </header>
      <Button />
      <DogBreeds />
    </div>
  );
}

export default App;
