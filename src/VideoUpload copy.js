import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';
import Dropzone from 'react-dropzone';
import axios from 'axios';



const ApiGatewayUrl = 'https://2sawgjl93i.execute-api.us-east-1.amazonaws.com/default/video-upload-url';


export default class VideoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMe: false
    };
    this.increase = this.increase.bind(this);

  };


  
  componentDidMount() {
    this.increase(1);
  }

  increase(percent) {
    this.setState({ percent });
  }



  onDrop = (files) => {

  var config = {
    onUploadProgress: progressEvent => {
      var percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total );      
      this.setState({"percent": percentCompleted})
    }
  };
  // first get the pre-signed URL
    axios.get(ApiGatewayUrl,
       {"params": {"key": files[0].name,
       "bucket": "videopipe"}})
    .then((response) => {
      // now do a PUT request to the pre-signed URL
      axios.put(response.data.url, files[0], config).then((response) => {
        this.setState({
          statusCode: response.status
        });
        //call this to indicate that the upload completed and pass back the file information to the parent


        let fileData = {
          file: {
            modified: files[0].lastModifiedDate,
            name: files[0].name,
            size: files[0].size,
            type: files[0].type,
            key: files[0].name,
            bucket: "videopipe"
          }
        }

        // Convert data to JSON string.
        let serializedData = JSON.stringify(fileData);


        this.props.fileDidUpload(serializedData);
        this.props.uploadDidComplete();
      });
    });
    this.setState({hideMe: true});
  };

  render() {
    return (

      <div>
        <div style={{display: this.state.hideMe ? 'none' : 'block'}}>
        <div style={{'background-color': '#cfc', 'padding': '10px', 'border': '1px solid green', 'height': '210px', 'width': '210px'}}>
          <Dropzone onDrop={this.onDrop} >
            <p>Drop your files here or click to select one.</p>
          </Dropzone></div>
          <p>Status Code: {this.state.statusCode}</p>
        </div>
        <div style={{display: this.state.hideMe? '' : 'none'}}>
        <div style={{ width: '10%', margin: '10%' }}>
          <Circle strokeWidth="2" percent={this.state.percent} />
        </div></div>
      </div>
    );
  };
};