import React from 'react';
import { Thumbnail } from './Thumbnail';

import './Timeline.css';

export const Timeline = props => {
  let art = props.art;
  return (
    <div className="timeline">
      {art.map((p) => {
        return <Thumbnail key={p.id} piece={p} />
      })}
    </div>
  )
}
