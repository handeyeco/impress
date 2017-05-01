import React, { Component } from 'react';
import "./Thumbnail.css";

export class Thumbnail extends Component {
  render() {
    const piece = this.props.piece;

    return (
      <div className="thumbnail">
        <img src={piece.small_image} alt={piece.title + " by " + piece.artist} />
        <p>{piece.year_completed}</p>
      </div>
    )
  }
}
