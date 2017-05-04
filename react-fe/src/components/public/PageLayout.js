import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PageLayout.css';

export class PageLayout extends Component {
  render() {
    return (
      <div>
        <nav><Link className="page_title" to="/">Impressionism</Link></nav>
        {this.props.children}
      </div>
    )
  }
}
