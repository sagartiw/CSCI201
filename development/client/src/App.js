import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {AddEvent} from './pages/AddEvent';
import {EditEvent} from './pages/EditEvent';
import {GlobalProvider} from "./context/GlobalState";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div style={{maxWidth: "50rem", margin: "1rem auto"}}>
          <GlobalProvider>
              <Router>
                  <Switch>
                      <Route path ='/AddEvent' component={AddEvent} />
                      <Route path ='/EditEvent/:id' component={EditEvent}/>
                      <Route path ='/' exact component={Home} />
                      <Route path ='/Home' component={Home} />
                  </Switch>
              </Router>
          </GlobalProvider>
      </div>
  );
}

export default App;
