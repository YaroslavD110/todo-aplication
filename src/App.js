import React, { Component, Fragment } from 'react';

import Todos from './Todos/Components/index';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Todos />
      </Fragment>
    );
  }
}

export default App;
