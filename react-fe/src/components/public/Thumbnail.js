import React from 'react';
import { Link } from 'react-router-dom';

import "./Thumbnail.css";

export const Thumbnail = props => {
  let p = props.piece;
  return (
    <div className="p-thumbnail-container">
      <Link to={"/details/" + p.id}><img src={p.image_500} alt={p.title + " by " + p.artist} className="p-thumbnail-img" /></Link>
      <ul className="p-thumbnail-details">
        <li className="p-thumbnail-golden">{p.title}</li>
        <li>by {p.artist}</li>
        <li>{p.year_completed}</li>
      </ul>
    </div>
  )
}
