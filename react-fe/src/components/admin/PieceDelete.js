import React from 'react';
import { Link } from 'react-router-dom';

export const PieceDelete = props => {
  let p = props.piece;

  return (
    <div>
      <Link to={`/admin/art/${p.id}`}>Back</Link>
      <form action="/admin">
        <input type="hidden" name="id" value={p.id} />
        <input type="button" value="Delete" />
      </form>
    </div>
  )
}
