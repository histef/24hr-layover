import React, { Component } from 'react';

  let markers = []
  let marker;
  let map;


class Map extends Component{

  componentDidMount(){
    this.googleChecker();
  }

  //check if google maps API is ready to use
  googleChecker = () => {
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
      center: {lat: 29.9511,lng: -90.0600}
    }
    // create map instance
    map = new window.google.maps.Map(this.mapContainer, options)

    this.props.locations.map(location => {
      let position = location.location;
      let title = location.title;
      let id = location.id;

      marker = new window.google.maps.Marker({
      map,
      position,
      title,
      animation: window.google.maps.Animation.DROP,
      id
      });
    })

      markers.push(marker);
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


//TODO:
  //child component Marker
  //pass map variable to add Marker to
  //do map here to create a list of markers
  //assign state Markers array here...
  //then we can change the state depending on user's dd menu choice
