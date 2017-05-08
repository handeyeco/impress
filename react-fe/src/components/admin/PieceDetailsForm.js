import React, { Component } from 'react';

export class PieceDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      piece: {...props.piece},
      image: {}
    };

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
    console.log(e.target);
    let fd = new FormData(e.target);
    e.preventDefault();
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
      let request = JSON.stringify(this.state.image.file);
      console.log(this.state);
      console.log(request);
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

    let imageUploader = (
      <span>
        Image:
        <input type="file" name="image" onChange={this.handleImageSelection} /><br />
      </span>
    );

    return (
      <div>
        {imagePreview}
        <form onSubmit={this.handleFormSubmit}>
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
  }
}
