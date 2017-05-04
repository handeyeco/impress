import React from 'react';
import { Link } from 'react-router-dom';

import './PageLayout.css';

export const PageLayout = props => {
  return (
    <div>
      <nav><Link className="page-title" to="/">Impressionism</Link></nav>
      {props.children}
    </div>
  )
}
