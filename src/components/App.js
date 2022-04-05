import React from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import Escrow from './pages/Escrow/Escrow';
import Ballot from './pages/Vote/Vote';
import CreateBallot from './pages/CreateBallot/CreateBallot';


function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/escrow" component={Escrow} />
      <Route exact path="/ballot" component={Ballot} />
      <Route exact path="/createballot" component={CreateBallot} />
      
      </Switch>
    </div>
    </BrowserRouter>  
      
  );
}


export default App;
