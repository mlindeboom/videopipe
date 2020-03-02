

import React, { Component } from 'react';
import FormContainer from './FormContainer';

export default class AddInformation extends Component {
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
      <div className="step addinformation">
      <h1><p>Demo</p></h1>
      <FormContainer addInformationDidComplete={() => this.props.jumpToStep(2)}/>
      </div>
    )
  }
}