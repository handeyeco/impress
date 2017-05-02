import React, { Component } from 'react';
import './PieceZoom.css';

export class PieceZoom extends Component {
  render() {
    let p = this.props.piece;
    return (
      // <div className="zoom_container">
        <img className="piece_zoom" src={p.hr_image} alt={p.title + " by " + p.artist} />
      // </div>
    )
  }
}
