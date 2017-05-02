import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Timeline } from './components/Timeline';
import { PieceDetails } from './components/PieceDetails';
import { PageLayout } from './components/PageLayout';
import { PieceZoom } from './components/PieceZoom';

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
        <Switch>
          <Route exact path="/"
            render={() => (
              <PageLayout>
                <Timeline art={this.state.art} />
              </PageLayout>
            )}
          />
          <Route exact path="/zoom/:id"
            render={(props) => (
              <PieceZoom piece={this.returnPieceByID(props.match.params.id)} />
            )}
          />
          <Route exact path="/details/:id"
            render={(props) => (
              <PageLayout>
                <PieceDetails piece={this.returnPieceByID(props.match.params.id)} />
              </PageLayout>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
