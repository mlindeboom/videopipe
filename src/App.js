
import React, { Component } from 'react';
import VideoWorkflow from './VideoWorkflow';
import "babel-polyfill";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  };

  
  componentDidMount() {
  }

  componentWillUnmount() {  	
  }

  render() {
    return (
      <div>
      <VideoWorkflow/>
      </div>
    );
  };
}