import React from 'react';
import { Link } from 'react-router-dom';

import './SlideContainer.css';

export const SlideContainer = props => {
  let links = [...props.links].map((elem, idx) => {
    if (elem.appendID && props.piece && props.piece.id) { elem.dest = `${elem.dest}/${props.piece.id}` };
    return (
      <Link key={idx} to={elem.dest}>{elem.name}</Link>
    )
  });

  return (
    <div className="a-slidecontainer">
      <nav className="a-slidecontainer-nav">
        { links }
      </nav>
      <div className="a-slidecontainer-content">
        {props.children}
      </div>
    </div>
  )
}
