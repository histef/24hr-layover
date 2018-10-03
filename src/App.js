import React, { Fragment,Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import axios from 'axios';
import { clientId, clientSecret } from './config'
import './App.css'

import FilterMenu from './Components/FilterMenu.js'
// import Map from './Components/Map'
import Footer from './Components/Footer'


// const this.state.locations =
  // {title: 'Bourbon Street', location: {lat: 29.9540,lng: -90.0698}, venueId: '4c41e11a520fa593d744caac', id:1, foursquareInfoIsShowing: false},
  // {title: 'Lafayette Cemetery No. 1', location: {lat: 29.9288,lng: -90.0854}, venueId: '4ad4c04ef964a520d4f320e3', id:2, foursquareInfoIsShowing: false},
  // {title: 'Cafe Du Monde', location: {lat: 29.9574,lng: -90.0618}, venueId: '4aa59477f964a520dd4820e3', id:3, foursquareInfoIsShowing: false},
  // {title: 'Ace Hotel', location: {lat: 29.9483,lng: -90.0719}, venueId: '56c9eeeb498e242cd07bb392', id:4, foursquareInfoIsShowing: false},
  // {title: 'Preservation Hall', location: {lat: 29.9583,lng: -90.0654}, venueId: '41326e00f964a520081a1fe3', id:5, foursquareInfoIsShowing: false}


class App extends Component {
  state = {
    venues: [],
    filterMenuIsOpen: true,
    getWidth: window.innerWidth,
    searchfield: '',
    chosenLocation: 0,
    map: {},
    markers: [],
    infoWindow: {},
    foursquareDb: [],
    filteredVenues: [],
    locations: [
      {
        title: 'Bacchanal Fine Wine & Spirits',
        location: {lat: 29.9598,lng: -90.0332},
        venueId: '4adbaabff964a520e62921e3',
        id:0,
        foursquareInfoIsShowing: false
      },
      {
        title: 'Bourbon Street',
        location: {lat: 29.9540,lng: -90.0698},
        venueId: '4c41e11a520fa593d744caac',
        id:1,
        foursquareInfoIsShowing: false
      },
    ],
  }

  componentDidMount = () => {

    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.googleChecker();
  }

  // componentDidUpdate(prevProps,prevState){
  //   if(prevState.venues !== this.state.venues){
  //     this.setState({ filteredVenues: this.state.venues })
  //   }
  // }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  //depending on user screen, re-render the layout for page
  updateWindowDimensions = () => {
    this.setState({ getWidth: window.innerWidth });
  }

  googleChecker = () => {
      if (!window.google) {
          console.error("Google API did not load yet");
      } else {
          //google maps API is ready, so render the map
          this.loadVenues();
      }
  }

  loadVenues = () => {
  let addVenues = [];

  this.state.locations.map( location => {
  axios
    .get( `https://api.foursquare.com/v2/venues/${location.venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&near=new_orleans`)
    .then(response => {
      // console.log(response.data)
      addVenues.push(response.data);
      this.setState({ venues: this.state.venues.concat(response.data),
      filteredVenues: this.state.venues.concat(response.data) })
      })
    .catch(error => {
      alert("Error: Couldn't load data from Foursquare.");
      console.log("ERROR: " + error);
    });

    return addVenues;
  })
    this.initMap();
  }

  // create the map
  initMap = () => {
    const options = {
            zoom: 13,
            center: {
                lat: 29.9511,
                lng: -90.0600
            }
        }

    // create map instance
    let map = new window.google.maps.Map(this.mapContainer, options)

    // making the info window
    let infoWindow = new window.google.maps.InfoWindow();

    this.setState({ map, infoWindow })

    // render markers
    let markers = this.state.locations.map(location => {
      //infowindow content
      // var contentString = `${myVenue.response.venue.name} @ ${myVenue.response.venue.location.address}`;

     let position = location.location;
      let title = location.title;
      let id = location.id;
      let venueId = location.venueId;


      //creates each marker
      let marker = new window.google.maps.Marker({
          map,
          position,
          title,
          animation: window.google.maps.Animation.DROP,
          id,
          venueId
      });

      // click on marker
      marker.addListener("click", () => {

        this.showMarker(marker);
      });

      return marker;
    })
    this.setState({ markers });
  }

  showMarker = ( marker ) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 400);

    this.showInfoWindow(marker);
}
  //populate and animate infowindow
  showInfoWindow = marker => {
    let venueFromDb = this.state.venues.filter(v => v.response.venue.id === marker.venueId)
    // console.log(venueFromDb[0].response);

    let content = `<p>${venueFromDb[0].response.venue.name}</p>
                  <p>${venueFromDb[0].response.venue.rating}</p>`

    this.state.infoWindow.setContent(content);

    this.state.infoWindow.open(this.state.map, marker);
  }

  toggleFilterMenu = () => {
    this.setState(currentState => ({
      filterMenuIsOpen: !currentState.filterMenuIsOpen
    }))
  }

  updateSearch = search => {
    this.setState({ searchfield: search })
    this.getLocations(search)
  }

  // when user is searching find matching this.state.venues, store in filteredVenues
  getLocations = (search) => {
    if (search){
      const match = new RegExp(escapeRegExp(search), 'i')
      this.setState({ filteredVenues: this.state.venues.filter(venue=>match.test(venue.response.venue.name)) })
    } else {
      this.setState({ filteredVenues: this.state.venues })
    }
  }


  // updateChosenLocation = (id) => {
  //   this.setState({ chosenLocation: id})
  //   // console.log('chosen loc working:' + this.state.chosenLocation)
  // }

  // animateMarkerFromList = e => {
  //   let selectedMarker = this.state.markers[e.id];

  //   if (e) {
  //     this.animateMarker(selectedMarker)
  //   }
  // }

  // animateMarker = (marker) => {
  //   marker.setAnimation(window.google.maps.Animation.BOUNCE);
  //   setTimeout(() => {
  //     marker.setAnimation(null);
  //   }, 1500);
  // }

  // toggleDbInfo = (e) => {
  //   const index = Number(e.id);

  //   //copy locations array
  //   let locationsCopy = this.state.locations.slice();
  //   // change the clicked on location's foursquareInfoIsShowing
  //   locationsCopy[index].foursquareInfoIsShowing = !locationsCopy[index].foursquareInfoIsShowing
  //   // set state to new array
  //   this.setState({ locations: locationsCopy })
  //   // console.log(`getIndex ${i}`)
  // }

  render() {

    // console.log(this.state.venues)

    return (
      <Fragment>
        <header>
          <h1 className="title"><span>New Orleans</span><br />Neighborhood Map</h1>
        </header>
        <div className="wrapper">
          <FilterMenu
            filterMenuIsOpen={this.state.filterMenuIsOpen}
            onToggleFilterMenu={this.toggleFilterMenu}
            screenWidth={this.state.getWidth}
            onUpdateSearch={this.updateSearch}
            value={this.state.searchfield}
            onGetLocations={this.getLocations}
            showLocations={this.state.filteredVenues}
            updateChosenLocation={this.updateChosenLocation}
            markers={this.state.markers}
            animateMarker={this.animateMarkerFromList}
            foursquareDb={this.state.foursquareDb}
            toggleDbInfo={this.toggleDbInfo}
            venues={this.state.venues}
            markers={this.state.markers}
            showMarker={this.showMarker}
          />
          <main
            style={{ width: 500, height: 500, backgroundColor: '#ddd'}}
            id="map"
            ref={div => {this.mapContainer = div}}>
          </main>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default App;
