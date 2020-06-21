import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './styles.css';

import Nav from './components/Nav';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
          <Switch>
              <Route exact path="/" ><Home /> </Route> 
            
              <Route exact path="/signin" > <Signin /> </Route> 
            
               <Route exact path="/signup" > <Signup /> </Route> 
                  
                <Route exact  path="/dashboard" > <Dashboard /> </Route> 
          
          </Switch>

      </AuthProvider>

    
    </Router>

  )
}

export default App;
