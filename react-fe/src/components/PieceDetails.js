import React, { Component } from 'react';
import './PieceDetails.css';

export class PieceDetails extends Component {
  render() {
    let p = this.props.piece;
    return (
      <div className="piece_container">
        <div>
          <img className="piece_image" src={p.small_image} alt={p.title + " by " + p.artist} />
          <div className="piece_details">
            <strong>{p.title}</strong><br />
            {p.year_started === p.year_completed ? p.year_completed : p.year_started + " - " + p.year_completed}<br />
            <em>by {p.artist}</em><br/>
            <em>{p.born + " - " + p.died}</em>
          </div>
        </div>
        <p className="piece_description">{p.description}</p>
      </div>
    )
  }
}
