import React from 'react';
import { Link } from 'react-router-dom';

export const PieceImage = props => {
  let p = props.piece;
  return (
    <div>
      <Link to={`/admin/art/${p.id}`}>Back</Link>
      <div className="piece-image">
        <img src={p.small_image} alt={p.title + " by " + p.artist} />
      </div>
      <form action="/admin">
        <input type="file" name="image" /><br />
        <input type="button" value="Submit" />
      </form>
    </div>
  )
}
