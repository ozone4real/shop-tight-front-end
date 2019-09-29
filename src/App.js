import React, { useEffect, Fragment } from 'react';
// import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import LogInPage from './pages/LogInPage';
import { Route, Switch } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import Dummy from './components/DummyPage'
import  RegisterProductPage from './pages/RegisterProductPage'
import AddCategoryPage from './pages/AddCategoryPage'

function Main() {
  return <div className="container"><h1>Home Page</h1></div>
}
function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar />
      <Switch>
      <Route path="/dummy" component={Dummy} />
      <Route path="/registerProduct" component={RegisterProductPage} />
      <Route path="/addCategory" component={AddCategoryPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/" component={Main} exact />
      </Switch>
    </div>
    
  );
}

export default App;
