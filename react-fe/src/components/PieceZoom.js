import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PieceZoom.css';

export class PieceZoom extends Component {
  render() {
    let p = this.props.piece;
    return (
      <Link to={'/details/' + p.id}><img className="piece_zoom" src={p.hr_image} alt={p.title + " by " + p.artist} /></Link>
    )
  }
}
