import React from 'react';
// import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar />
      <SignUpForm />
    </div>
  );
}

export default App;
