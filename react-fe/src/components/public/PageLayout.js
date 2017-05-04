import React from 'react';
import { Link } from 'react-router-dom';

import './PageLayout.css';

export const PageLayout = props => {
  return (
    <div>
      <nav><Link className="page_title" to="/">Impressionism</Link></nav>
      {props.children}
    </div>
  )
}
