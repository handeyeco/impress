import React from 'react';
import { Link } from 'react-router-dom';

import './ArtListThumbnail.css';

export const ArtListThumbnail = props => {
  const p = props.piece;

  const style = {
    backgroundImage: `url(${p.image_500})`
  }

  return (
    <Link to={`/admin/art/${p.id}`}>
      <div className="a-artlistthumbnail-container" style={style}>
        <p>{p.title}<br />
        by {p.artist}</p>
      </div>
    </Link>
  )
}
