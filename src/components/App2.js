import React from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import Escrow from './pages/Escrow/Escrow';
import Ballot from './pages/Vote/Vote';
import HomePage from './components/user/Homepage';

function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/escrow" component={Escrow} />
      <Route exact path="/" component={SignIn} />
      <Route exact path="/homepage" component={HomePage} />
      
      </Switch>
    </div>
    </BrowserRouter>  
      
  );
}


export default App;
