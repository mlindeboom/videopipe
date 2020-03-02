
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const API = 'https://7uc19baxd4.execute-api.us-east-1.amazonaws.com/default/video-tracking';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };


   fetch(API)
          .then(response => response.json())
          .then(data => this.setState({ stats: data }));
 



  }


  componentDidMount() {
  }

  componentWillUnmount() {}


  render() {


      let recordArray = [];

      if (this.state.stats!==undefined){
        
        //create a new json object with the data we need for the table display 
        for(let i=0; i<this.state.stats.Count; i++){
          
          let item = this.state.stats.Items[i];
          let time = item.id;
          let raw = item.track;
          let processed = raw.replace(/"/g,'"');
          console.log(processed);
          let jsonified = JSON.parse(processed);
          console.log(jsonified.content.id);
          console.log(jsonified.events[0].name);
          let myDate = new Date(Number(time)).toLocaleString();

          let newRecord = {
            event : {
              time : '',
              state : '',
              timeSpent: '',
              profileId: '',
              playbackUrl: ''
            }
          };

          newRecord.event.time = myDate;
          newRecord.event.state = jsonified.events[0].name;
          newRecord.event.timeSpent = jsonified.playback.timeSpent;
          newRecord.event.profileId = jsonified.user.profileId;
          newRecord.event.playbackUrl = jsonified.content.playbackUrl;
          recordArray.push(newRecord);

        }

     const columns = [{
        Header: 'Time',
        accessor: 'event.time' 
      },{
        Header: 'Event',
        accessor: 'event.state' 
      },{
        Header: 'User',
        accessor: 'event.profileId' 
      }]


      return(
<div><p><h1>Demo</h1></p>
      <ReactTable className="-striped"
        data={recordArray}
        columns={columns}
      /></div>)

      }



  }
}