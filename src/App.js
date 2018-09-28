import React, { Fragment,Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import axios from 'axios';
import { clientId, clientSecret } from './config'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'
import Footer from './Components/Footer'

let venueData;

// const this.state.locations =
  // {title: 'Bourbon Street', location: {lat: 29.9540,lng: -90.0698}, venueId: '4c41e11a520fa593d744caac', id:1, foursquareInfoIsShowing: false},
  // {title: 'Lafayette Cemetery No. 1', location: {lat: 29.9288,lng: -90.0854}, venueId: '4ad4c04ef964a520d4f320e3', id:2, foursquareInfoIsShowing: false},
  // {title: 'Cafe Du Monde', location: {lat: 29.9574,lng: -90.0618}, venueId: '4aa59477f964a520dd4820e3', id:3, foursquareInfoIsShowing: false},
  // {title: 'Ace Hotel', location: {lat: 29.9483,lng: -90.0719}, venueId: '56c9eeeb498e242cd07bb392', id:4, foursquareInfoIsShowing: false},
  // {title: 'Preservation Hall', location: {lat: 29.9583,lng: -90.0654}, venueId: '41326e00f964a520081a1fe3', id:5, foursquareInfoIsShowing: false}


class App extends Component {
  state = {
    filterMenuIsOpen: true,
    getWidth: window.innerWidth,
    searchfield: '',
    chosenLocation: 0,
    showLocations: [],
    markers: [],
    foursquareDb: [],
    filteredDbInfo: [],
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
    this.setState({ showLocations: [...this.state.locations] })
    //For each location, get the FS data

    //Now we should have all the FS data for each location. We can grab any info from this.state.foursquareDb

    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();

  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  //depending on user screen, re-render the layout for page
  updateWindowDimensions = () => {
    this.setState({ getWidth: window.innerWidth });
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

  // when user is searching find matching this.state.locations, store in showLocations
  getLocations = (search) => {
    if (search){
      const match = new RegExp(escapeRegExp(search), 'i')
      this.setState({ showLocations: this.state.locations.filter(location=>match.test(location.title)) })
    } else {
      this.setState({ showLocations: this.state.locations })
    }
    // console.log(this.state.showLocations);
  }


  updateChosenLocation = (id) => {
    this.setState({ chosenLocation: id})
    // console.log('chosen loc working:' + this.state.chosenLocation)
  }

  getMarkers = (markersFromMap) => {
    this.setState({ markers: markersFromMap })
  }

  animateMarkerFromList = e => {
    let selectedMarker = this.state.markers[e.id];

    if (e) {
      this.animateMarker(selectedMarker)
    }
  }

  animateMarker = (marker) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1500);
  }

  toggleDbInfo = (e) => {
    const index = Number(e.id);

    //copy locations array
    let locationsCopy = this.state.locations.slice();
    // change the clicked on location's foursquareInfoIsShowing
    locationsCopy[index].foursquareInfoIsShowing = !locationsCopy[index].foursquareInfoIsShowing
    // set state to new array
    this.setState({ locations: locationsCopy })
    // console.log(`getIndex ${i}`)
  }

  render() {

    console.log(this.state.markers)

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
            updateChosenLocation={this.updateChosenLocation}
            markers={this.state.markers}
            animateMarker={this.animateMarkerFromList}
            foursquareDb={this.state.foursquareDb} //DELETE these when its complete
            toggleDbInfo={this.toggleDbInfo}
            // filteredDb={this.state.filteredDbInfo}
            // locations={this.state.locations}
          />
          <Map
            locations={this.state.locations}
            chosenLocation={this.state.chosenLocation}
            getMarkers={this.getMarkers}
            animateMarker={this.animateMarker}
            foursquareDb={this.state.foursquareDb}
          />
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default App;


// import React, { Fragment,Component } from 'react'
// import escapeRegExp from 'escape-string-regexp'
// import axios from 'axios';
// import { clientId, clientSecret } from './config'

// import FilterMenu from './Components/FilterMenu.js'
// import Map from './Components/Map'
// import './App.css'
// import Footer from './Components/Footer'

// let venueData;

// // const this.state.locations =
//   // {title: 'Bourbon Street', location: {lat: 29.9540,lng: -90.0698}, venueId: '4c41e11a520fa593d744caac', id:1, foursquareInfoIsShowing: false},
//   // {title: 'Lafayette Cemetery No. 1', location: {lat: 29.9288,lng: -90.0854}, venueId: '4ad4c04ef964a520d4f320e3', id:2, foursquareInfoIsShowing: false},
//   // {title: 'Cafe Du Monde', location: {lat: 29.9574,lng: -90.0618}, venueId: '4aa59477f964a520dd4820e3', id:3, foursquareInfoIsShowing: false},
//   // {title: 'Ace Hotel', location: {lat: 29.9483,lng: -90.0719}, venueId: '56c9eeeb498e242cd07bb392', id:4, foursquareInfoIsShowing: false},
//   // {title: 'Preservation Hall', location: {lat: 29.9583,lng: -90.0654}, venueId: '41326e00f964a520081a1fe3', id:5, foursquareInfoIsShowing: false}


// class App extends Component {
//   state = {
//     filterMenuIsOpen: true,
//     getWidth: window.innerWidth,
//     searchfield: '',
//     chosenLocation: 0,
//     showLocations: [],
//     markers: [],
//     foursquareDb: [],
//     filteredDbInfo: [],
//     locations: [
//       {
//         title: 'Bacchanal Fine Wine & Spirits',
//         location: {lat: 29.9598,lng: -90.0332},
//         venueId: '4adbaabff964a520e62921e3',
//         id:0,
//         foursquareInfoIsShowing: false
//       },
//       {
//         title: 'Bourbon Street',
//         location: {lat: 29.9540,lng: -90.0698},
//         venueId: '4c41e11a520fa593d744caac',
//         id:1,
//         foursquareInfoIsShowing: false
//       },
//     ],
//   }

//   componentDidMount = () => {
//     this.setState({ showLocations: [...this.state.locations] })
//     //For each location, get the FS data
//     this.state.locations.map( location => {
//       axios.get( `https://api.foursquare.com/v2/venues/${location.venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&near=new_orleans`)
//         .then(response => {
//           this.setState( prevState => {
//             venueData = response.data.response.venue
//             //add FS data to the foursquareDb
//             return {
//               foursquareDb: prevState.foursquareDb.concat(venueData)
//             }})
//         })
//         .catch(error => console.log(error))
//         return venueData;
//     })
//     //Now we should have all the FS data for each location. We can grab any info from this.state.foursquareDb

//     window.addEventListener('resize', this.updateWindowDimensions);
//     this.updateWindowDimensions();
//     this.setState({ filteredDbInfo: [...this.state.foursquareDb] })
//   }

//   componentWillUnmount = () => {
//     window.removeEventListener('resize', this.updateWindowDimensions);
//   }

//   //depending on user screen, re-render the layout for page
//   updateWindowDimensions = () => {
//     this.setState({ getWidth: window.innerWidth });
//   }

//   toggleFilterMenu = () => {
//     this.setState(currentState => ({
//       filterMenuIsOpen: !currentState.filterMenuIsOpen
//     }))
//   }

//   updateSearch = search => {
//     this.setState({ searchfield: search })
//     this.getLocations(search)
//   }

//   // when user is searching find matching this.state.locations, store in showLocations
//   getLocations = (search) => {
//     if (search){
//       const match = new RegExp(escapeRegExp(search), 'i')
//       this.setState({ showLocations: this.state.locations.filter(location=>match.test(location.title)) })
//     } else {
//       this.setState({ showLocations: this.state.locations })
//     }
//     // console.log(this.state.showLocations);
//   }


//   updateChosenLocation = (id) => {
//     this.setState({ chosenLocation: id})
//     // console.log('chosen loc working:' + this.state.chosenLocation)
//   }

//   getMarkers = (markersFromMap) => {
//     this.setState({ markers: markersFromMap })
//   }

//   animateMarkerFromList = e => {
//     let selectedMarker = this.state.markers[e.id];

//     if (selectedMarker) {
//       this.animateMarker(selectedMarker)
//     }
//   }

//   animateMarker = (marker) => {
//     marker.setAnimation(window.google.maps.Animation.BOUNCE);
//     setTimeout(() => {
//       marker.setAnimation(null);
//     }, 1500);
//   }

//   toggleDbInfo = (e) => {
//     const index = Number(e.id);

//     //copy locations array
//     let locationsCopy = this.state.locations.slice();
//     // change the clicked on location's foursquareInfoIsShowing
//     locationsCopy[index].foursquareInfoIsShowing = !locationsCopy[index].foursquareInfoIsShowing
//     // set state to new array
//     this.setState({ locations: locationsCopy })
//     // console.log(`getIndex ${i}`)
//   }

//   render() {

//     console.log(this.state.foursquareDb)

//     return (
//       <Fragment>
//         <header>
//           <h1 className="title"><span>New Orleans</span><br />Neighborhood Map</h1>
//         </header>
//         <div className="wrapper">
//           <FilterMenu
//             filterMenuIsOpen={this.state.filterMenuIsOpen}
//             onToggleFilterMenu={this.toggleFilterMenu}
//             screenWidth={this.state.getWidth}
//             onUpdateSearch={this.updateSearch}
//             value={this.state.searchfield}
//             onGetLocations={this.getLocations}
//             showLocations={this.state.showLocations}
//             updateChosenLocation={this.updateChosenLocation}
//             markers={this.state.markers}
//             animateMarker={this.animateMarkerFromList}
//             foursquareDb={this.state.foursquareDb} //DELETE these when its complete
//             toggleDbInfo={this.toggleDbInfo}
//             // filteredDb={this.state.filteredDbInfo}
//             // locations={this.state.locations}
//           />
//           <Map
//             locations={this.state.locations}
//             chosenLocation={this.state.chosenLocation}
//             getMarkers={this.getMarkers}
//             animateMarker={this.animateMarker}
//             foursquareDb={this.state.foursquareDb}
//           />
//         </div>
//         <Footer />
//       </Fragment>
//     )
//   }
// }

// export default App;

// TODO: when user clicks marker or list item, display API data

// https://stackoverflow.com/questions/42037369/how-to-edit-an-item-in-a-state-array
