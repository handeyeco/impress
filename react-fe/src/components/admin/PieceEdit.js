import React from 'react';
import { Link } from 'react-router-dom';

import { PieceDetailsForm } from './PieceDetailsForm.js';

export const PieceEdit = props => {
  let p = props.piece;

  return (
    <div>
      <Link to={`/admin/art/${p.id}`}>Back</Link>
      <PieceDetailsForm piece={p} handlePieceUpdate={props.handlePieceUpdate} />
    </div>
  )
}
