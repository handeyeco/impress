import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Admin }        from './components/admin/Admin';
import { Login }        from './components/admin/Login';
import { PageLayout }   from './components/public/PageLayout';
import { PieceDetails } from './components/public/PieceDetails';
import { PieceZoom }    from './components/public/PieceZoom';
import { Timeline }     from './components/public/Timeline';

import { db } from './mock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { art: db };
  }

  // Helper function to grab piece of art from array of pieces
  // accepts id: number, unique id of a piece of art
  // returns piece object if there's a match or undefined
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
          // Index page displays art timeline
          <Route exact path="/"
            render={() => (
              <PageLayout>
                <Timeline art={this.state.art} />
              </PageLayout>
            )}
          />

          // Entry for admin dashboard
          <Route path="/admin" component={Admin} />

          // Route for piece details
          <Route path="/details/:id"
            render={(props) => (
              <PageLayout>
                <PieceDetails piece={this.returnPieceByID(props.match.params.id)} />
              </PageLayout>
            )}
          />

        <Route path="/login" component={Login} />

          // Route for piece zoom page
          <Route path="/zoom/:id"
            render={(props) => (
              <PieceZoom piece={this.returnPieceByID(props.match.params.id)} />
            )}
          />

          // Redirect to index for weird URLs
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
