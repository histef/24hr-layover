import React, { Fragment,Component } from 'react'

import FilterMenu from './Components/filter-menu.js'
import Map from './Components/Map'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="title"><span>New Orleans</span><br />Neighborhood Map</h1>
        <div className="wrapper">
          <FilterMenu />
          <Map />
        </div>
      </Fragment>
    )
  }
}

export default App;
