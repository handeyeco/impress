import React from 'react';

import { SlideContainer } from './SlideContainer';
import { PieceDetailsForm } from './PieceDetailsForm.js';

export const PieceAdd = props => {
  const links = [{dest: "/admin", name: "Back"}];

  return (
    <SlideContainer links={links}>
      <PieceDetailsForm handlePieceUpdate={props.handlePieceUpdate} />
    </SlideContainer>
  )
}
