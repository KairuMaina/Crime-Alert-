// src/App.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CrimeReports from './components/CrimeReports';
import CreateReport from './components/CreateReport';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/reports" component={CrimeReports} />
        <Route path="/create-report" component={CreateReport} />
      </Switch>
    </Router>
  );
}

export default App;
