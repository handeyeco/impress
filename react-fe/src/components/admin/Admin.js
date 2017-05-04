import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { db } from '../../mock';

import './Admin.css';

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { art: db };
  }

  render() {
    return (
      <h1>Hello There</h1>
    )
  }
}
