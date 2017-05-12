import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { SlideContainer } from './SlideContainer'

import './PieceImage.css';

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
        <div className="admin-middle-container">
          <div className="a-pieceimage-flex">
            <div className="a-pieceimage-imagebox">
              <img src={i.imagePreview || p.image_500} alt={p.title + " by " + p.artist} />
            </div>
            <form action={`/api/piece/image/${p.id}`} encType="multipart/form-data" onSubmit={this.handleFormSubmit} className="a-pieceimage-form controlled-form">
              <label htmlFor="image" className="a-pieceimage-imagelabel"><svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"/></svg></label>
              <input type="file" id="image" name="image" accept="image/*" onChange={this.handleImageSelection} /><br />
              <input type="hidden" name="id" value={p.id} />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </SlideContainer>
    )
    return (
      <div>
        {this.state.complete ? <Redirect to={`/admin/art/${p.id}`} /> : uploader}
      </div>
    )
  }
}
