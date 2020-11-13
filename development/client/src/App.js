import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from './pages/Home';
import {AddEvent} from './pages/AddEvent';
import {EditEvent} from './pages/EditEvent';


function App() {
  return (
      <div className="App">
        <h1>APP</h1>
          <Router>
              <Switch>
                  <Route path ='/' exact component={Home} />
                  <Route path ='/Home' component={Home} />
                  <Route path ='/AddEvent' component={AddEvent} />
                  <Route path ='/EditEvent' component={EditEvent}/>
                  <Home/>
                  <AddEvent/>
                  <EditEvent/>
              </Switch>

          </Router>

      </div>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}

export default App;
