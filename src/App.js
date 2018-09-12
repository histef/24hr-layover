import React, { Fragment,Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

import FilterMenu from './Components/FilterMenu.js'
// import Map from './Components/Map'
import './App.css'

let map;
let marker;

const locations = [
  {title: 'Bacchanal Fine Wine & Spirits', location: {lat: 29.9598,lng: -90.0332}, id: 0},
  {title: 'Bourbon Street', location: {lat: 29.9590,lng: -90.0652}, id: 1},
  {title: 'Lafayette Cemetery No. 1', location: {lat: 29.9288,lng: -90.0854}, id: 2},
  {title: 'Cafe Du Monde', location: {lat: 29.9574,lng: -90.0618}, id: 3},
  {title: 'Ace Hotel', location: {lat: 29.9483,lng: -90.0719}, id: 4},
]

class App extends Component {

  state = {
    filterMenuIsOpen: true,
    getWidth: window.innerWidth,
    searchfield: '',
    showLocations: [...locations],
    chosenLocation: 0,
    markers: []
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.googleChecker();
    }

// componentDidUpdate(prevProps) {
//   if (this.state.chosenLocation !== prevProps.chosenLocation) {
//     this.animateMarkerFromList(this.state.markers[this.state.chosenLocation]);
//   }
// }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

//detect window resize to change layout
  updateWindowDimensions = () => {
    this.setState({ getWidth: window.innerWidth });
  }

//open and close filter menu
  toggleFilterMenu = () => {
    this.setState(currentState => ({
      filterMenuIsOpen: !currentState.filterMenuIsOpen
    }))
  }

//lets React detect when the searchfield is changing and executes getLocations method
  updateSearch = search => {
    this.setState({ searchfield: search })
    this.getLocations(search)
  }

//find matching locations based on search input
  getLocations = (search) => {
    if (search){
      const match = new RegExp(escapeRegExp(search), 'i')
      this.setState({ showLocations: locations.filter(location=>match.test(location.title)) })
    } else {
      this.setState({ showLocations: locations })
    }
    console.log(this.state.showLocations);
  }

//gets the list item (via id) that the user clicked on
  updateChosenLocation = (id) => {
    this.setState({ chosenLocation: id })
    console.log('from app.js ' + this.state.chosenLocation)
        //this should animate marker based on the users click but I get error:
    // Cannot read property 'setAnimation' of undefined
    this.animateMarkerFromList(this.state.markers[this.state.chosenLocation])
  }

/******google map********/
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
    locations.forEach(location => {
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

    this.updateMarkersList(marker)
    // console.log(marker.id)

    this.animateMarker();

    })
  }

  updateMarkersList = (marker) => {
    this.setState({ markers: this.state.markers.push(marker) })
    // console.log(this.state.markers)
  }

  animateMarker= () => {
      marker.addListener('click', function(){
         if (this.getAnimation() !== null) {
            this.setAnimation(null);
          } else {
            this.setAnimation(window.google.maps.Animation.BOUNCE);
          }
    })
  }

  animateMarkerFromList = (marker) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
  }

  render() {
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
            showLocations={this.state.showLocations}
            updateChosenLoc={this.updateChosenLocation}
            markers={this.state.markers}
          />
          <div
          style={{ width: '75vw', height: 500 }}
          id="map"
          ref={div => {this.mapContainer = div}}>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App;
