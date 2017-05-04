import React from 'react';
import { Link } from 'react-router-dom';

export const PieceEdit = props => {
  let p = props.piece;

  return (
    <div>
      <Link to={`/admin/art/${p.id}`}>Back</Link>
      <form action="/admin">
        Title:
        <input type="text" placeholder={p.title} name="title" required /><br />
        Year Started:
        <input type="text" placeholder={p.year_started} name="year_started" required /><br />
        Year Completed:
        <input type="text" placeholder={p.year_completed} name="year_completed" required /><br />
        Artist:
        <input type="text" placeholder={p.artist} name="artist" required /><br />
        Born:
        <input type="text" placeholder={p.born} name="born" required /><br />
        Died:
        <input type="text" placeholder={p.died} name="died" required /><br />
        Museum:
        <input type="text" placeholder={p.museum} name="museum" required /><br />
        Museum Link:
        <input type="text" placeholder={p.museum_link} name="museum_link" required /><br />
        Description:
        <textarea placeholder={p.description} name="description" required /><br />
        <input type="hidden" name="id" value={p.id} />
        <input type="button" value="Submit" />
      </form>
    </div>
  )
}
