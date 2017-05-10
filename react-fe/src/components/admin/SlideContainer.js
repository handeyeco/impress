import React from 'react';
import { Link } from 'react-router-dom';

export const SlideContainer = props => {
  let links = [...props.links].map((elem, idx) => {
    if (elem.appendID && props.piece && props.piece.id) { elem.dest = `${elem.dest}/${props.piece.id}` };
    return (
      <Link key={idx} to={elem.dest}>{elem.name}</Link>
    )
  });

  return (
    <div>
      <nav>
        { links }
      </nav>
      <div>
        {props.children}
      </div>
    </div>
  )
}
