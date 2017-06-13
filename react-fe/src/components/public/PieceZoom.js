import React from 'react';
import { Link } from 'react-router-dom';

import './PieceZoom.css';

export const PieceZoom = props => {
  let p = props.piece;
  return (
    <div className="p-piecezoom-container">
      <img className="p-piecezoon-img" src={p.image_hr} alt={p.title + " by " + p.artist} />
    </div>
  )
}
