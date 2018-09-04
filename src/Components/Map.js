import React, { Component } from 'react';

class Map extends Component{


  componentDidMount(){
    this.googleChecker();
  }

  googleChecker = () => {
    //check if google maps API is ready to use
    if(!window.google) {
      console.error("Google API did not load yet");
    } else {
      //google maps API is ready, so render the map
      this.initMap();
    }
  }

  initMap = () => {
    const options = {
      zoom: 13,
      center: {lat: 29.9511,lng: -90.0715}
    }
    // create map instance
    new window.google.maps.Map(this.mapContainer, options)
  }

  render(){
    return(
        <div
          style={{ width: '75vw', height: 500 }}
          id="map"
          ref={div => {this.mapContainer = div}}>
      </div>
    );
  }
}

export default Map