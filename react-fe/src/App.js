import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Timeline } from './components/Timeline';
import { PieceDetails } from './components/PieceDetails';

import { db } from './mock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { art: db };
  }

  returnPieceByID(id) {
    id = +id;
    return this.state.art.find(elem => {
      return elem.id === id;
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/"
            render={() => <Timeline art={this.state.art} />}
          />
          <Route path="/:id"
            render={(props) => <PieceDetails piece={this.returnPieceByID(props.match.params.id)} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
