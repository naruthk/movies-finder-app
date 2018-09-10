import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'
import history from './utils/history'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Styles
import './assets/scss/style.scss'
import 'semantic-ui-css/semantic.min.css';

// Components
import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import Faq from './pages/Faq';

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/list/:movieid" component={Details} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faq" component={Faq} />
    </Switch>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
