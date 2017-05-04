import React from 'react';
import { Link } from 'react-router-dom';

export const PieceDetails = props => {
  let p = props.piece;

  return (
    <div className="piece-container">
      <Link to={`/admin/art/details/${p.id}`}>Edit</Link>
      <Link to={`/admin/art/image/${p.id}`}>Image</Link>
      <Link to={`/admin/art/delete/${p.id}`}>Delete</Link>
      <div>
        <div className="piece-image">
          <Link to={"/zoom/" + p.id}>
            <img src={p.small_image} alt={p.title + " by " + p.artist} />
          </Link>
        </div>
        <div className="piece-full-details">
          <p><strong>Title:</strong> {p.title}</p>
          <p><strong>Year Started:</strong> {p.year_started}</p>
          <p><strong>Year Completed:</strong> {p.year_completed}</p>
          <p><strong>Artist:</strong> {p.artist}</p>
          <p><strong>Born:</strong> {p.born}</p>
          <p><strong>Died:</strong> {p.died}</p>
          <p><strong>Museum:</strong> {p.museum}</p>
          <p><strong>Museum Link:</strong> {p.museum_link}</p>
        </div>
      </div>
      <p><strong>Description:</strong></p>
      <p className="piece-description">{p.description}</p>
    </div>
  )
}
