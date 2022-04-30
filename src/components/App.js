import React from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import Escrow from './pages/Escrow/ReportAnimal';
import Ballot from './pages/Vote/ReportAnimal';
import CreateBallot from './pages/CreateBallot/ReportAnimal';
import ReportAnimal from './ReportAnimal';
// import CreateBallot from './pages/CreateBallot/CreateBallot';



function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/escrow" component={Escrow} />
      <Route exact path="/ballot" component={Ballot} />
      <Route exact path="/createballot" component={CreateBallot} />
      <Route exact path="/report" component={ReportAnimal} />
      
      </Switch>
    </div>
    </BrowserRouter>  
      
  );
}


export default App;
