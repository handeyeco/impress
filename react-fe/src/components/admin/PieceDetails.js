import React from 'react';

import { SlideContainer } from './SlideContainer'

import './PieceDetails.css';

export const PieceDetails = props => {
  const p = props.piece;
  const links = [
    {dest: "/admin", name: "Back"},
    {dest: "/admin/art/edit", name: "Edit", appendID: true},
    {dest: "/admin/art/image", name: "Image", appendID: true},
    {dest: "/admin/art/delete", name: "Delete", appendID: true}
  ];

  return (
    <SlideContainer links={links} piece={p}>
      <div className="admin-middle-container">
        <div className="a-piecedetails-inner-container">
          <div className="a-piecedetails-image">
            <img src={p.image_500} alt={p.title} />
          </div>
          <table className="a-piecedetails-table">
            <tbody>
              <tr>
                <th>Title:</th>
                <td>{p.title}</td>
              </tr>
              <tr>
                <th>Started:</th>
                <td>{p.year_started}</td>
              </tr>
              <tr>
                <th>Completed:</th>
                <td>{p.year_completed}</td>
              </tr>
              <tr>
                <th>Artist:</th>
                <td>{p.artist}</td>
              </tr>
              <tr>
                <th>Born:</th>
                <td>{p.born}</td>
              </tr>
              <tr>
                <th>Died:</th>
                <td>{p.died}</td>
              </tr>
              <tr>
                <th>Museum:</th>
                <td>{p.museum}</td>
              </tr>
              <tr>
                <th>Link:</th>
                <td><a href={`http://${p.museum_link}`}>{p.museum_link}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>Description:</strong></p>
        <p className="a-piecedetails-description">{p.description}</p>
      </div>
    </SlideContainer>
  )
}
