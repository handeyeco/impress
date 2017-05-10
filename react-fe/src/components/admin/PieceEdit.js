import React from 'react';

import { SlideContainer } from './SlideContainer';
import { PieceDetailsForm } from './PieceDetailsForm.js';

export const PieceEdit = props => {
  const p = props.piece;
  const links = [{dest: "/admin/art", name: "Back", appendID: true}];

  return (
    <SlideContainer links={links} piece={p}>
      <PieceDetailsForm piece={p} handlePieceUpdate={props.handlePieceUpdate} />
    </SlideContainer>
  )
}
