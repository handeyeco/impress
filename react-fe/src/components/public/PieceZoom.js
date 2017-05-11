import React from 'react';
import { Link } from 'react-router-dom';

import './PieceZoom.css';

export const PieceZoom = props => {
  let p = props.piece;
  return (
    <Link to={'/details/' + p.id}><img className="piece_zoom" src={p.image_hr} alt={p.title + " by " + p.artist} /></Link>
  )
}
