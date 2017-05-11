import React from 'react';
import { Link } from 'react-router-dom';

import './PieceDetails.css';

export const PieceDetails = props => {
  let p = props.piece;
  return (
    <div className="piece-container">
      <div>
        <div className="piece-image">
          <Link to={"/zoom/" + p.id}>
            <img src={p.image_500} alt={p.title + " by " + p.artist} />
          </Link>
        </div>
        <div className="piece-details">
          <strong>{p.title}</strong><br />
          {p.year_started === p.year_completed ? `ca. ${p.year_completed}` : `ca. ${p.year_started}-${p.year_completed}`}<br />
          <em>{p.artist}</em><br/>
          <em>{`${p.born}-${p.died}`}</em>
        </div>
      </div>
      <p className="piece-description">{p.description}</p>
    </div>
  )
}
