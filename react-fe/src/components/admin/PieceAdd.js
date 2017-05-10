import React from 'react';
import { Link } from 'react-router-dom';

import { PieceDetailsForm } from './PieceDetailsForm.js';

export const PieceAdd = props => {
  return (
    <div>
      <Link to="/admin">Back</Link>
      <PieceDetailsForm handlePieceUpdate={props.handlePieceUpdate} />
    </div>
  )
}
