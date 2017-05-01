import React, { Component } from 'react';
import { db } from './mock';
import { Timeline } from './components/Timeline';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { art: db };
  }

  render() {
    return (
      <Timeline art={this.state.art} />
    );
  }
}

export default App;
