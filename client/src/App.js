import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import New from './New';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/polls/new" component={New} />
      </Switch>
    </main>
  );
}

export default App;
