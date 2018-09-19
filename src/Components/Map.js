import React, { Component } from 'react';

let marker;
let map;
let infowindow;

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
    let newMarkers = this.props.locations.map(location => {
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

      infowindow = new window.google.maps.InfoWindow({
        content: `${title}`
      });

      //animate marker when clicked on, must go before return value to add the listener to each marker
      this.animateClickedMarker(marker, infowindow);

      //must return a value: array-callback-return
      return marker;

    })

          //update marker array in App.js
      this.props.getMarkers(newMarkers)
  }

  animateClickedMarker = (clickedMarker, correspondingInfoWindow) => {
    clickedMarker.addListener('click', function(){
      this.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        this.setAnimation(null);
      }, 1500);
      correspondingInfoWindow.open(map, clickedMarker);
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


//TODO
  //infowindow
  //fetch foursquare data and use to create infowindow content.but need
  // to pass to list item too...so maybe foursquare info should be in app.js
  // looks like data gets passed to state using setstate in promise.
