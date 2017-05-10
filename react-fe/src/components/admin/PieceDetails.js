import React from 'react';

import { SlideContainer } from './SlideContainer'

export const PieceDetails = props => {
  const p = props.piece;
  const links = [
    {dest: "/admin", name: "Back"},
    {dest: "/admin/art/edit", name: "Edit", appendID: true},
    {dest: "/admin/art/image", name: "Image", appendID: true},
    {dest: "/admin/art/delete", name: "Delete", appendID: true}
  ]

  return (
    <SlideContainer links={links} piece={p}>
      <div>
        <div className="piece-image">
          <img src={p.small_image} alt={p.title + " by " + p.artist} />
        </div>
        <div className="piece-full-details">
          <p><strong>Title:</strong> {p.title}</p>
          <p><strong>Year Started:</strong> {p.year_started}</p>
          <p><strong>Year Completed:</strong> {p.year_completed}</p>
          <p><strong>Artist:</strong> {p.artist}</p>
          <p><strong>Born:</strong> {p.born}</p>
          <p><strong>Died:</strong> {p.died}</p>
          <p><strong>Museum:</strong> {p.museum}</p>
          <p><strong>Museum Link:</strong> <a href={`http://${p.museum_link}`}>{p.museum_link}</a></p>
        </div>
      </div>
      <p><strong>Description:</strong></p>
      <p className="piece-description">{p.description}</p>
    </SlideContainer>
  )
}
