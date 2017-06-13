import React from 'react';
import { Link } from 'react-router-dom';

import './PageLayout.css';

export const PageLayout = props => {
  return (
    <div>
      <nav className="p-pagelayout-nav">
        <Link className="p-pagelayout-title" to="/">Impressionism</Link>
      </nav>
      <div className="p-pagelayout-container">
        {props.children}
      </div>
    </div>
  )
}
