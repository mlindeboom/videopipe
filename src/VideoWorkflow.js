import React, { Component } from 'react';
import StepZilla from "react-stepzilla";

import BeginUpload from './BeginUpload';
import AddInformation from './AddInformation';
import Finish from './Finish';
import Stats from './Stats';
import './VideoWorkflow.css';

export default class VideoWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
	}

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    const steps =
    [
      {name: 'BeginUpload', component: <BeginUpload fileDidLoad={(myFile) => window.sessionStorage.setItem('myfile', myFile)}/>},
      {name: 'AddInformation', component: <AddInformation/>},
      {name: 'Finish', component: <Finish />},
      {name: 'Stats', component: <Stats />},
    ]

    return (
      <div className='videoworkflow'>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            showNavigation={false}
            showSteps={false}
            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
           />
        </div>
      </div>
    )
  }
}
