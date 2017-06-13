import React from 'react';
import { Link } from 'react-router-dom';

import './PieceDetails.css';

export const PieceDetails = props => {
  let p = props.piece;
  return (
    <div className="p-piecedetails-container">
      <div className="p-piecedetails-flex">
        <Link to={"/zoom/" + p.id}>
          <img className="p-piecedetails-img" src={p.image_500} alt={p.title + " by " + p.artist} />
        </Link>
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
              <td>{
                  p.museum_link ?
                  <a href={`http://${p.museum_link}`}>{p.museum}</a> :
                  p.museum
              }</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="p-piecedetails-goldrow" />
      <p className="p-piecedetails-description">{p.description}</p>
    </div>
  )
}
