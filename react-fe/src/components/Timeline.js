import React, { Component } from 'react';
import { Thumbnail } from './Thumbnail';
import './Timeline.css';

export class Timeline extends Component {
  render() {
    const art = this.props.art;

    return (
      <div className="timeline">
        {art.map((piece) => {
          return <Thumbnail key={piece.id} piece={piece} />
        })}
      </div>
    )
  }
}
