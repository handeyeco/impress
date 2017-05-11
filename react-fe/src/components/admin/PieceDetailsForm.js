import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './PieceDetailsForm.css';

export class PieceDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: {...props.piece},
      image: {},
      complete: false
    };

    this.handlePieceUpdate    = props.handlePieceUpdate;

    this.handleInputChange    = this.handleInputChange.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);
    this.handleFormSubmit     = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      piece: {
        ...this.state.piece,
        [name]: value
      }
    });
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
        this.setState({complete: true})
      }
    };
    xhr.send(formData);
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

  render() {
    let imagePreview = "";
    if (this.state.image && this.state.image.imagePreview) {
      imagePreview = (
        <img src={this.state.image.imagePreview} alt="Upload Preview" />
      );
    }

    const imageUploader = (
      <span>
        <label htmlFor="image" className="a-piecedetailsform-imagelabel"><svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"/></svg></label>
        <input type="file" name="image" id="image" accept="image/*" onChange={this.handleImageSelection} /><br />
      </span>
    );

    const form = (
      <div>
        <form action={this.state.piece.id ? `/api/piece/edit/${this.state.piece.id}` : "/api/pieces/add"} encType="multipart/form-data" onSubmit={this.handleFormSubmit} className="a-piecedetailsform-form">
          <div className="a-piecedetailsform-imagebox">
            {imagePreview}
            {this.state.piece.id ? "" : imageUploader}
          </div>

          <div className="a-piecedetailsform-formflex">
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" value={this.state.piece.title} name="title" id="title" onChange={this.handleInputChange} required /><br />

              <label htmlFor="year_started">Year Started:</label>
              <input type="text" value={this.state.piece.year_started} name="year_started" id="year_started" onChange={this.handleInputChange} required /><br />

              <label htmlFor="year_completed">Year Completed:</label>
              <input type="text" value={this.state.piece.year_completed} name="year_completed" id="year_completed" onChange={this.handleInputChange} required /><br />

              <label htmlFor="museum">Museum:</label>
              <input type="text" value={this.state.piece.museum} name="museum" id="museum" onChange={this.handleInputChange} required /><br />
            </div>
            <div>
              <label htmlFor="artist">Artist:</label>
              <input type="text" value={this.state.piece.artist} name="artist" id="artist" onChange={this.handleInputChange} required /><br />

              <label htmlFor="born">Born:</label>
              <input type="text" value={this.state.piece.born} name="born" id="born" onChange={this.handleInputChange} required /><br />

              <label htmlFor="died">Died:</label>
              <input type="text" value={this.state.piece.died} name="died" id="died" onChange={this.handleInputChange} required /><br />

              <label htmlFor="museum_link">Museum Link:</label>
              <input type="text" value={this.state.piece.museum_link} name="museum_link" id="museum_link" onChange={this.handleInputChange} required /><br />
            </div>
          </div>

          <label htmlFor="description">Description:</label>
          <textarea value={this.state.piece.description} name="description" onChange={this.handleInputChange} required /><br />

          <input type="hidden" name="id" value={this.state.piece.id} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )

    return (
      <div>
        {this.state.complete ? <Redirect to={this.state.piece.id ? `/admin/art/${this.state.piece.id}` : "/admin"} /> : form}
      </div>
    )
  }
}
