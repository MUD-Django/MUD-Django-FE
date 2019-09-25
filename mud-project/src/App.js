import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from './Components/Login';
import Registration from './Components/Registration'
import Map from './Components/Map';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <Route path="/" component={Login} />
		<Route
      exact
      path="/reg"
      component={Registration}
		/>
    <PrivateRoute
      exact
      path="/protected"
      component={Map}
    />
    </div>
    </Router>
  );
}

export default App;
