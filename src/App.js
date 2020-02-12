import React from 'react';
import './styles/css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home'


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
