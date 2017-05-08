import React from 'react';
import { Link } from 'react-router-dom';

import { PieceDetailsForm } from './PieceDetailsForm.js';

export const PieceAdd = () => {
  return (
    <div>
      <Link to="/admin">Back</Link>
      <PieceDetailsForm />
    </div>
  )
}
