import React from 'react';
import videojs from 'video.js';
import trackingEvents from 'videojs-tracking-events';


export default class VideoPlayer extends React.Component {
  componentDidMount() {
    videojs.registerPlugin('trackingEvents',trackingEvents);
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      this.trackingEvents({url: 'https://7uc19baxd4.execute-api.us-east-1.amazonaws.com/default/video-tracking', 
        contentId: 'brainshark@bms',
        profileId: "lindebom",});
        console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    )
  }
}