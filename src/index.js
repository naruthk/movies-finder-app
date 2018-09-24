import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom'
import history from './utils/history'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import Faq from './pages/Faq';
import NotFound from './pages/NotFound';

import 'semantic-ui-css/semantic.min.css';

require('dotenv').config()

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/list" component={Home} />
      <Route exact path="/list/:movieid" component={Details} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faq" component={Faq} />
      <Route path="*" component={NotFound} status={404} />
    </Switch>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
