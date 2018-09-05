import React, { Fragment,Component } from 'react'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'

class App extends Component {
  state = {
    filterMenuIsOpen: true
  }

  toggleFilterMenu = () => {
    this.setState(currentState => ({
      filterMenuIsOpen: !currentState.filterMenuIsOpen
    }))
    console.log(this.state.filterMenuIsOpen)
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
          />
          <Map />
        </div>
      </Fragment>
    )
  }
}

export default App;
