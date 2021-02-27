import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import New from './New';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/pirate/new' component={New} />
      </Switch>
    </main>
  );
}

export default App;
