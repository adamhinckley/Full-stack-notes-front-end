import React, { Component } from "react";
import axios from "axios";

class EditNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle: this.props.note.noteTitle,
      noteBody: this.props.note.noteBody,
      note: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchNote(id);
  }

  fetchNote = id => {
    axios
      .get(`http://localhost:4000/api/notes/${id}`)
      .then(res => this.setState({ note: res.data }))
      .catch(res => console.log(res));
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  helper = e => {
    this.props.editNote(e, this.state.note.id, this.state);
    this.setState({ title: "", textBody: "" });
    this.props.history.push("/");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="notes-header">
          <h3>Edit Note:</h3>
        </div>
        <form onSubmit={this.helper}>
          <input
            className="form-note-title"
            name="noteTitle"
            value={this.state.noteTitle}
            onChange={this.changeHandler}
            type="text"
            placeholder="Note Title"
          />
          <textarea
            className="form-note-content"
            name="noteBody"
            value={this.state.noteBody}
            onChange={this.changeHandler}
            type="text"
            placeholder="Note Content"
          />
          <button className="form-button">Save</button>
        </form>
      </div>
    );
  }
}

export default EditNoteForm;
