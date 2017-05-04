import React from 'react';
import { Link } from 'react-router-dom';

import "./Thumbnail.css";

export const Thumbnail = props => {
  let p = props.piece;
  return (
    <div className="thumbnail">
      <Link to={"/details/" + p.id}><img src={p.small_image} alt={p.title + " by " + p.artist} /></Link>
      <p>{p.year_completed}</p>
    </div>
  )
}
