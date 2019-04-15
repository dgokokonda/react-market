import React, { Component, Fragment } from 'react';
import Form from './components/form/Form';
import './App.css';

class App extends Component {

  render() {
    console.log(this.props.testStore);
    return (
      <Fragment>
        <Form />
      </Fragment>
    );
  }
}

export default App;

