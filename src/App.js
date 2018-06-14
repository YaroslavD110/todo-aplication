import React, { Component, Fragment } from 'react';

import todos from './almost_db';
import Todos from './Todos/Components/index';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Todos todos={todos} />
      </Fragment>
    );
  }
}

export default App;
