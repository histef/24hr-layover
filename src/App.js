import React, { Fragment,Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import axios from 'axios';
import { clientId, clientSecret } from './config.js'
import './App.css'

import FilterMenu from './Components/FilterMenu.js'
import Footer from './Components/Footer'

class App extends Component {
  state = {
    venues: [],
    filterMenuIsOpen: true,
    searchfield: '',
    map: {},
    markers: [],
    infoWindow: {},
    filteredVenues: [],
    locations: [
      {
        title: 'Ace Hotel',
        location: {lat: 29.9483,lng: -90.0719},
        venueId: '56c9eeeb498e242cd07bb392',
        id:0,
        foursquareInfoIsShowing: false
      },
      {
        title: 'Bacchanal Fine Wine & Spirits',
        location: {lat: 29.9598,lng: -90.0332},
        venueId: '4adbaabff964a520e62921e3',
        id:1,
        foursquareInfoIsShowing: false
      },
      {
        title: 'Bourbon Street',
        location: {lat: 29.9540,lng: -90.0698},
        venueId: '4c41e11a520fa593d744caac',
        id:2,
        foursquareInfoIsShowing: false
      },
      {
        title: 'Cafe Du Monde',
        location: {lat: 29.9574,lng: -90.0618},
        venueId: '4aa59477f964a520dd4820e3',
        id:3,
        foursquareInfoIsShowing: false
      },
      {
        title: 'Preservation Hall',
        location: {lat: 29.9583,lng: -90.0654},
        venueId: '41326e00f964a520081a1fe3',
        id:4,
        foursquareInfoIsShowing: false
      },
            {
        title: 'Shaya',
        location: {lat: 29.9210,lng: -90.0995},
        venueId: '547e7d1a498e82531865bd62',
        id:5,
        foursquareInfoIsShowing: false
      },
    ],
  }

  componentDidMount = () => {
    this.googleChecker();
  }

  //code attributed to: https://stackoverflow.com/questions/45429484/how-to-implement-google-maps-js-api-in-react-without-an-external-library
  googleChecker = () => {
      if (!window.google) {
          console.error("Google API has not loaded yet");
      } else {
          //google maps API is ready, so render the map
          this.initMap();
          this.loadVenues();
      }
  }

  // create the map
  initMap = () => {
    const options =
      {
        zoom: 12,
        center: {
          lat: 29.9511,
          lng: -90.0600
        }
      }

    // create map instance
    let map = new window.google.maps.Map(this.mapContainer, options)

    // making the info window
    let infoWindow = new window.google.maps.InfoWindow({maxWidth: 100});

    this.setState({ map, infoWindow })

    // render markers
    let markers = this.state.locations.map(location => {

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

  loadVenues = () => {
    let addVenues = [];

    this.state.locations.map( location => {
      axios
        .get( `https://api.foursquare.com/v2/venues/${location.venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&near=new_orleans`)
        .then(response => {
          addVenues.push(response.data);
          this.setState({ venues: this.state.venues.concat(response.data),
            //sort filteredVenues so initial rendering is sorted alphabetically (could also use promise.all(but if one rejects, they all reject))
            filteredVenues: this.state.venues.concat(response.data).sort( (a,b) => a.response.venue.name > b.response.venue.name) })
          })
        .catch(error => {
          //code attributed to: https://github.com/axios/axios
          if(error.response){
          console.log('Error data: ', error.response.data);
          console.log('Error status: ', error.response.status);
          console.log('Error headers: ', error.response.headers);
        } else if (error.request) {
          console.log('Error request: ', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log('Error config', error.config);
      });

      return addVenues;
    })
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
    let content;
    let venueFromDb = this.state.venues.filter(v => v.response.venue.id === marker.venueId)

    if(venueFromDb[0] === undefined){
      content =`<p style="text-align: center">Sorry, no information at this time</p>`
    } else {
    content = `<p style="text-align: center">${venueFromDb[0].response.venue.name}</p>
               <p style="text-align: center">${venueFromDb[0].response.venue.location.address}</p>
               <p style="text-align: center">Rating: ${venueFromDb[0].response.venue.rating}</p>
               <a href=${venueFromDb[0].response.venue.url} style="text-align: center">Go to website</a>`
    }

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
    let newVenues=[];
    if (search){
      const match = new RegExp(escapeRegExp(search), 'i')
      newVenues = this.state.venues
      //sort this.state.venues so when users not searching anymore, list is still alphabetical
      .sort( (a,b) => a.response.venue.name > b.response.venue.name)
      .map(venue=>{
        if(match.test(venue.response.venue.name)){
          return venue;
        } else {
          return venue = null;
        }
      })
      this.setState({ filteredVenues: newVenues })
     } else {
      this.setState({ filteredVenues: this.state.venues })
    }
  }

  render() {
    return (
      <Fragment>
        <header>
          <h1 className="title"><span>New Orleans</span><br />Neighborhood Map</h1>
        </header>
        <div className="wrapper">
          <p className="intro">I went to New Orleans for the first time over the summer. I quickly fell in love with the city. The vibrancy of Bourbon Street, the oh-so-delicious comfort food with a creole twist, and, of course, love that jazz. As such, I want to spread the love, so I have curated a list of tested and approved eateries, venues and sights when visiting this beautiful place. Enjoy!</p>
          <FilterMenu
            filterMenuIsOpen={this.state.filterMenuIsOpen}
            onToggleFilterMenu={this.toggleFilterMenu}
            screenWidth={this.state.getWidth}
            onUpdateSearch={this.updateSearch}
            value={this.state.searchfield}
            onGetLocations={this.getLocations}
            showLocations={this.state.filteredVenues}
            markers={this.state.markers}
            venues={this.state.venues}
            showMarker={this.showMarker}
          />
          <main
            style={{ width: '85vw', height: 500, backgroundColor: '#ddd'}}
            id="map"
            ref={div => {this.mapContainer = div}}
            role="application"
            aria-label="map of New Orleans venues"
          >
          </main>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default App;
