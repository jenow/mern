import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import New from './New';
import Profile from './Profile';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/pirate/new' component={New} />
        <Route path='/pirate/:id' component={Profile} />
      </Switch>
    </main>
  );
}

export default App;
