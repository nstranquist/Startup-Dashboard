import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import {Button} from 'antd'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import QuillEditor from './editor.style';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
    this.quillModules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    };
  }

  handleChange(value) {
    this.setState({ value })
  }

  handleSubmit = () => {
    this.props.submitApplication(this.state.value)
  }

  render() {
    const options = {
      theme: 'snow',
      formats: TextEditor.formats,
      placeholder: 'Write Something',
      value: this.state.value,
      onChange: this.handleChange,
      modules: this.quillModules,
    };
    return (
      <QuillEditor>
        <ReactQuill {...options} />
        <Button onClick={this.handleSubmit}>
          {/* should toggle a modal. in the modal, can go back to dashboard */}
          Submit
        </Button>
        <Button onClick={this.handleCheck}>
          Check Your Work
        </Button>
      </QuillEditor>
    );
  }
}
