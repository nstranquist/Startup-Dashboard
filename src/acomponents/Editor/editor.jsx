import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Async from '../../helpers/asyncComponent';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import IntlMessages from '../../components/utility/intlMessages';
import { createApplication, deleteApplication } from '../../redux/_store/applications'
import { connect } from 'react-redux';

const TextEditor = props => (
  <Async
    load={import(/* webpackChunkName: "forms-editor" */ './textEditor')}
    componentProps={props}
  />
);

function uploadCallback(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      loading: false,
      iconLoading: false
    };
  }

  handleCheck = () => {
    console.log('checked')
  }
  submitApplication = (text) => { // title here
    // create & save to redux the 'application' object
    // 1) unique application id, 2) plain text from editor, 3) title, 4) (optional) scholarship id
    // when this screen gets called, needs to take a scholarship id as props.
    // if it is null or undefined, display a modal that allows user to select a scholarship.
    // (maybe it redirects them to scholarships list), so in the list needs to be an apply button for each item
    // 
    console.log('submitted text:', text)
    // create the application object on submit
    this.props.createApplication(text)
  }
  deleteApplication = (id) => {
    console.log('id:', id)
    this.props.deleteApplication(id)
  }

  render() {
    const { loading, essays, errors } = this.props.applications
  
    const onEditorStateChange = editorState => {
      this.setState({ editorState });
    };
    const editorOption = {
      style: { width: '90%', height: '70%' },
      editorState: this.state.editorState,
      toolbarClassName: 'home-toolbar',
      wrapperClassName: 'home-wrapper',
      editorClassName: 'home-editor',
      onEditorStateChange: onEditorStateChange,
      uploadCallback: uploadCallback,
      toolbar: { image: { uploadCallback: uploadCallback } }
    };

    if(!loading) console.log('essays:', essays)

    return (
      <LayoutWrapper>
        <PageHeader>{<IntlMessages id="forms.editor.header" />}</PageHeader>
        {/* add essays list */}
        <Box>
          <ContentHolder>
            {/* Asynchronously load Editor */}
            <TextEditor {...editorOption} submitApplication={this.submitApplication} />
          </ContentHolder>
        </Box>
        <Box>
          {loading && <div>loading...</div>}
          {essays.length > 0 ? essays.map(essay => (
            <Application essay={essay} deleteApplication={this.deleteApplication} />
          )) : (
            <div>No Essays yet</div>
          )}
        </Box>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  applications: state.myapp.applications
})

export default connect(
  mapStateToProps,
  { createApplication, deleteApplication }
)(Editor)


const Application = ({
  essay,
  deleteApplication
}) => {
  return (
    <div style={{}}>
      <div>Text: {essay.text}</div>
      <button onClick={() => deleteApplication(essay.id)}>Delete</button>
    </div>
  )
}
