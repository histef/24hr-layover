import React, { Fragment,Component } from 'react'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'

class App extends Component {
  state = {
    locations: [
    {title: 'Bacchanal Fine Wine & Spirits', location: {lat: 29.9598,lng: -90.0332}},
    {title: 'Bourbon Street', location: {lat: 29.9590,lng: -90.0652}},
    {title: 'Lafayette Cemetery No. 1', location: {lat: 29.9288,lng: -90.0854}},
    {title: 'Cafe Du Monde', location: {lat: 29.9574,lng: -90.0618}},
    {title: 'Ace Hotel', location: {lat: 29.9483,lng: -90.0719}},
  ],
    filterMenuIsOpen: true,
    getWidth: window.innerWidth
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ getWidth: window.innerWidth });
  }

  toggleFilterMenu = () => {
    this.setState(currentState => ({
      filterMenuIsOpen: !currentState.filterMenuIsOpen
    }))
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
          />
          <Map locations={this.state.locations}/>
        </div>
      </Fragment>
    )
  }
}

export default App;
