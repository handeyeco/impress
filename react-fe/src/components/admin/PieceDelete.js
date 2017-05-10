import React from 'react';
import { Link } from 'react-router-dom';

export const PieceDelete = props => {
  const p = props.piece;

  function handleFormSubmit(e) {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    let formData = new FormData(e.target);
    let action = e.target.getAttribute('action');
    xhr.open('POST', action, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.response);
        props.handlePieceUpdate(response);
      }
    };
    xhr.send(formData);
  }

  return (
    <div>
      <Link to={`/admin/art/${p.id}`}>Back</Link>
      <form action={`/api/piece/delete/${p.id}`} onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={p.id} />
        <input type="submit" value="Delete" />
      </form>
    </div>
  )
}
