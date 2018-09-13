import React, { Component } from 'react';

let marker;
let map;

class Map extends Component{

  componentDidMount(){
    this.googleChecker()
  }

// componentDidUpdate(prevProps, prevState) {
//   // only update chart if the data has changed
//   if (prevProps.chosenLocation !== this.props.chosenLocation) {
//      this.state.markers[this.props.chosenLocation].setAnimation(window.google.maps.Animation.BOUNCE)
//   }
// }

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

    //for each location, create marker and add animation event
    this.props.locations.map(location => {
      let position = location.location;
      let title = location.title;
      let id = location.id;

      //creates each marker
      marker = new window.google.maps.Marker({
      map,
      position,
      title,
      animation: window.google.maps.Animation.DROP,
      id
      })

      //update marker array in App.js
      this.props.getMarkers(marker)

      //animate marker when clicked on
      this.animateClickedMarker();
    })
  }

  animateClickedMarker= () => {
    marker.addListener('click', function(){
      this.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        this.setAnimation(null);
      }, 1500);
    })
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
