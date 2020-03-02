import React, {Component} from 'react';  

/* Import Components */
import Input from './components/Input';  
import TextArea from './components/TextArea';  
import Select from './components/Select';
import Button from './components/Button'

const ApiGatewayUrl = 'https://2sawgjl93i.execute-api.us-east-1.amazonaws.com/default/video-upload-url';

class FormContainer extends Component {  
  constructor(props) {
    super(props);
    const fileInfo = JSON.parse(window.sessionStorage.getItem('myfile'));
    
    this.state = {
      newVideo: {
        bucket: fileInfo.file.bucket,
        key: fileInfo.file.key,
        title: fileInfo.file.name,
        description: '',
        folder: '',
        active: ''
      },

      activeOptions: ['Yes','No'],
      folderOptions: ['Oncology','other']

    }


    console.log('>>'+fileInfo);

    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  
  handleTitle(e) {
   let value = e.target.value;
   this.setState( prevState => ({ newVideo : 
        {...prevState.newVideo, title: value
        }
      }), () => console.log(this.state.newValue))
  }

  handleDescription(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newVideo: {
        ...prevState.newVideo, description: value
      }
      }), ()=>console.log(this.state.newVideo))
  }



  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newVideo : 
        {...prevState.newVideo, [name]: value
        }
      }), () => console.log(this.state.newVideo))
  }

  


  
  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newVideo;

    fetch(ApiGatewayUrl,{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        if (response.ok) {
          response.json().then(data =>{
            console.log("Successful" + data);
            this.props.addInformationDidComplete();
          })} else {
            console.log("response.statusText");
          }
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newVideo: {
          title: '',
          description: '',
          folder: '',
          active: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'text'}
                   title= {'Title'} 
                   name= {'name'}
                   value={this.state.newVideo.title} 
                   placeholder = {'Enter video title'}
                   handleChange = {this.handleTitle}
                   
                   /> {/* Title of the video */}
        
            <TextArea
              title={'Description'}
              rows={5}
              value={this.state.newVideo.description}
              name={'description'}
              handleChange={this.handleDescription}
              placeholder={'Describe the video'} />{/* Description */}

            <Select title={'Folder'}
                  name={'folder'}
                  options = {this.state.folderOptions} 
                  value = {this.state.newVideo.options}
                  placeholder = {'Select folder'}
                  handleChange = {this.handleInput}
                  /> {/* Folder Selection */}

            

          <Select  title={'Active'}
                  name={'active'}
                  options={this.state.activeOptions}
                  value = { this.state.newVideo.active}
                  placeholder = {'Select yes or no'}
                  handleChange={this.handleInput}
                   /> {/* Active */}
          

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;