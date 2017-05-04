import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PieceDetails.css';

export class PieceDetails extends Component {
  render() {
    let p = this.props.piece;
    return (
      <div className="piece_container">
        <div>
          <div className="piece_image">
            <Link to={"/zoom/" + p.id}>
              <img src={p.small_image} alt={p.title + " by " + p.artist} />
            </Link>
          </div>
          <div className="piece_details">
            <strong>{p.title}</strong><br />
            {p.year_started === p.year_completed ? `ca. ${p.year_completed}` : `ca. ${p.year_started}-${p.year_completed}`}<br />
            <em>{p.artist}</em><br/>
            <em>{`${p.born}-${p.died}`}</em>
          </div>
        </div>
        <p className="piece_description">{p.description}</p>
      </div>
    )
  }
}
