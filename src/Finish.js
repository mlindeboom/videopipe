
import React, { Component } from 'react';
import VideoPlayer from './videoplayer.js';
import Button from './components/Button'




export default class Finish extends Component {
  constructor(props) {
    super(props);
    const fileInfo = JSON.parse(window.sessionStorage.getItem('myfile'))
    this.state = {
      videoJsOptions : {
        autoplay: false,
        controls: true,
        width: '640',
        height: '264',
        sources: [{
          src: '//s3.amazonaws.com/'+fileInfo.file.bucket+'/'+fileInfo.file.key,
          type: 'video/mp4'
        }]
      } 

    };
  }






  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    let myUrl = 'https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=https:'+this.state.videoJsOptions.sources[0].src;
  
    return (
      <div>
            <p><h1>Demo</h1></p>

        <div style={{'background-color': '#cfc', 'padding': '10px', 'border': '1px solid green', 
          'height': '284px', 'width': '660px', 'position': 'relative', 'left': '50%', 'top': '50%',
          'margin-left': '-330px'
        }}>
            <link rel="stylesheet" href="//vjs.zencdn.net/5.12/video-js.css" />
            <VideoPlayer { ...this.state.videoJsOptions } />

        </div>
        <img alt='' src={myUrl}/>


         <Button 
              action = {() => this.props.jumpToStep(3)}
              type = {'primary'} 
              title = {'Events'} 
            style={buttonStyle}
          /> 
 
      </div>
    )
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}