import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import Home from './pages/Home';
import Details from './pages/Details';
import About from './pages/About';
import Faq from './pages/Faq';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/list/:movieid" component={Details} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faq" component={Faq} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
