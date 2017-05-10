import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
        Image:
        <input type="file" name="image" accept="image/*" onChange={this.handleImageSelection} /><br />
      </span>
    );

    const form = (
      <div>
        {imagePreview}
        <form action={this.state.piece.id ? `/api/piece/edit/${this.state.piece.id}` : "/api/pieces/add"} encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
          {this.state.piece.id ? "" : imageUploader}
          Title:
          <input type="text" value={this.state.piece.title} name="title" onChange={this.handleInputChange} required /><br />
          Year Started:
          <input type="text" value={this.state.piece.year_started} name="year_started" onChange={this.handleInputChange} required /><br />
          Year Completed:
          <input type="text" value={this.state.piece.year_completed} name="year_completed" onChange={this.handleInputChange} required /><br />
          Artist:
          <input type="text" value={this.state.piece.artist} name="artist" onChange={this.handleInputChange} required /><br />
          Born:
          <input type="text" value={this.state.piece.born} name="born" onChange={this.handleInputChange} required /><br />
          Died:
          <input type="text" value={this.state.piece.died} name="died" onChange={this.handleInputChange} required /><br />
          Museum:
          <input type="text" value={this.state.piece.museum} name="museum" onChange={this.handleInputChange} required /><br />
          Museum Link:
          <input type="text" value={this.state.piece.museum_link} name="museum_link" onChange={this.handleInputChange} required /><br />
          Description:
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
