import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { ArtList }      from './ArtList';
import { PieceAdd }     from './PieceAdd';
import { PieceDelete }  from './PieceDelete';
import { PieceDetails } from './PieceDetails';
import { PieceEdit }    from './PieceEdit';
import { PieceImage }   from './PieceImage';

import { db } from '../../mock';

import './Admin.css';

export class Admin extends Component {
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
      <div className="admin-container">
        <div className="admin-sidebar">
          <Link className="page-title" to="/">Impressionism</Link>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li>Logout</li>
          </ul>
        </div>

        <div className="admin-content">
          <Switch>
            <Route exact path="/admin" render={() => (
                <ArtList art={this.state.art} />
              )}
            />
            <Route exact path="/admin/art/add" component={PieceAdd} />
            <Route exact path="/admin/art/details/:id" render={(props) => (
                <PieceEdit piece={this.returnPieceByID(props.match.params.id)} />
              )}
            />
            <Route exact path="/admin/art/image/:id" render={(props) => (
                <PieceImage piece={this.returnPieceByID(props.match.params.id)} />
              )}
            />
            <Route exact path="/admin/art/delete/:id" render={(props) => (
                <PieceDelete piece={this.returnPieceByID(props.match.params.id)} />
              )}
            />
            <Route exact path="/admin/art/:id" render={(props) => (
                <PieceDetails piece={this.returnPieceByID(props.match.params.id)} />
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
