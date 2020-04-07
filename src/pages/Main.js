import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';

function Main() {
  return (
    <Router>
      <Route exact path="/login/" component={ Login } />
    </Router>
  )
}

export default Main;