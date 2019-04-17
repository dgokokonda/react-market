import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Form from './components/form/Form';
import Catalog from './components/catalog/Catalog';
import './App.css';

const history = require('history').createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Form}></Route>
            <Route path="/catalog" component={Catalog}></Route>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;

