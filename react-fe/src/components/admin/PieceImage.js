import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { SlideContainer } from './SlideContainer'

export class PieceImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: {...props.piece},
      image: {},
      complete: false
    };

    this.handlePieceUpdate    = props.handlePieceUpdate;

    this.handleImageSelection = this.handleImageSelection.bind(this);
    this.handleFormSubmit     = this.handleFormSubmit.bind(this);
  }

  handleImageSelection(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: {
          file: file,
          imagePreview: reader.result
        }
      });
    }

    reader.readAsDataURL(file);
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
    const i = this.state.image;
    const links = [{dest: "/admin/art", name: "Back", appendID: true}];
    const uploader = (
      <SlideContainer links={links} piece={p}>
        <div className="piece-image">
          <img src={i.imagePreview || p.small_image} alt={p.title + " by " + p.artist} />
        </div>
        <form action={`/api/piece/image/${p.id}`} encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
          <input type="file" name="image" accept="image/*" onChange={this.handleImageSelection} /><br />
          <input type="hidden" name="id" value={p.id} />
          <input type="submit" value="Submit" />
        </form>
      </SlideContainer>
    )
    return (
      <div>
        {this.state.complete ? <Redirect to={`/admin/art/${p.id}`} /> : uploader}
      </div>
    )
  }
}
