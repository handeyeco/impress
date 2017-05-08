import React from 'react';
import { Link } from 'react-router-dom';

export const ArtList = props => {
  let art = [...props.art].map(p => (
    <li key={p.id}><Link to={`/admin/art/${p.id}`}>{p.year_completed}: {p.title} by {p.artist}</Link></li>
  ));

  return (
    <div>
      <Link to="/admin/art/add">Add</Link>
      {art}
    </div>
  )
}
