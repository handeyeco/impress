import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Thumbnail.css";

export class Thumbnail extends Component {
  render() {
    const piece = this.props.piece;

    return (
      <div className="thumbnail">
        <Link to={"/details/" + piece.id}><img src={piece.small_image} alt={piece.title + " by " + piece.artist} /></Link>
        <p>{piece.year_completed}</p>
      </div>
    )
  }
}
