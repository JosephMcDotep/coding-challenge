import './App.css';
import { Route, Switch } from 'react-router-dom';

import Main from './containers/Main/Main';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
