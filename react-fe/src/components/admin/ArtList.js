import React from 'react';

import { ArtListThumbnail } from './ArtListThumbnail';
import { SlideContainer } from './SlideContainer';

import './ArtList.css';

export const ArtList = props => {
  const art = [...props.art].map(p => (
    <ArtListThumbnail piece={p} key={p.id} />
  ));
  const links = [{dest: "/admin/art/add", name: "Add"}];

  return (
    <SlideContainer links={links}>
      <div className="a-artlist-container">
        {art}
      </div>
    </SlideContainer>
  )
}
