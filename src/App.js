import React, { Fragment,Component } from 'react'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="title"><span>New Orleans</span><br />Neighborhood Map</h1>
        <div className="wrapper">
          <FilterMenu />
          <Map
            id='map'
            options={{
              center: {lat: 29.9511, lng: -90.0715},
              zoom: 13
              }}
          />
        </div>
      </Fragment>
    )
  }
}

export default App;
