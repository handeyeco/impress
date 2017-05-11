import React from 'react';

import { SlideContainer } from './SlideContainer';
import { PieceDetailsForm } from './PieceDetailsForm.js';

import './PieceAdd.css';

export const PieceAdd = props => {
  const links = [{dest: "/admin", name: "Back"}];

  return (
    <SlideContainer links={links}>
      <div className="admin-middle-container">
        <PieceDetailsForm handlePieceUpdate={props.handlePieceUpdate} />
      </div>
    </SlideContainer>
  )
}
