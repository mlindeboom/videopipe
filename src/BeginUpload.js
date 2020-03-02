
import React, { Component } from 'react';
import VideoUpload from './VideoUpload';

export default class BeginUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    return (
      <div>
        <VideoUpload  
         fileDidUpload={(myFile) => this.props.fileDidLoad(myFile)}
         uploadDidComplete={() => this.props.jumpToStep(1)}
         /> 
      </div>
    )
  }
}