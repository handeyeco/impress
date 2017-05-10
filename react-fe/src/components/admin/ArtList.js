import React from 'react';
import { Link } from 'react-router-dom';

import { SlideContainer } from './SlideContainer';

export const ArtList = props => {
  const art = [...props.art].map(p => (
    <li key={p.id}>
      <Link to={`/admin/art/${p.id}`}>{p.year_completed}: {p.title} by {p.artist}</Link>
    </li>
  ));
  const links = [{dest: "/admin/art/add", name: "Add"}];

  return (
    <SlideContainer links={links}>
      {art}
    </SlideContainer>
  )
}
