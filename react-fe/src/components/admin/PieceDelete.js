import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { SlideContainer } from './SlideContainer';

import './PieceDelete.css';

export class PieceDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: {...props.piece},
      complete: false
    };

    this.handlePieceUpdate    = props.handlePieceUpdate;

    this.handleFormSubmit     = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    let formData = new FormData(e.target);
    let action = e.target.getAttribute('action');
    xhr.open('POST', action, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.response);
        this.handlePieceUpdate(response);
        this.setState({complete: true});
      }
    };
    xhr.send(formData);
  }

  render() {
    const p = this.state.piece;
    const links = [{dest: "/admin/art", name: "Back", appendID: true}];
    const del = (
      <SlideContainer links={links} piece={p}>
        <div className="a-piecedelete-container">
          <form action={`/api/piece/delete/${p.id}`} onSubmit={this.handleFormSubmit} className="a-piecedelete-form">
            <input type="hidden" name="id" value={p.id} />
            <p><em>{p.title} by {p.artist}</em></p>
            <p><strong>Are you sure you want to delete this piece?</strong></p>
            <input type="submit" id="delete" value="Delete" />
          </form>
        </div>
      </SlideContainer>
    )

    return (
      <div>
        {this.state.complete ? <Redirect to="/admin" /> : del}
      </div>
    )
  }
}
