import React, { Fragment,Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'

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
    showLocations: [...locations]
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

  updateSearch = search => {
    this.setState({ searchfield: search })
    this.getLocations(search)
  }

  getLocations = (search) => {
    if (search){
      const match = new RegExp(escapeRegExp(search), 'i')
      this.setState({ showLocations: locations.filter(location=>match.test(location.title)) })
    } else {
      this.setState({ showLocations: locations })
    }
    console.log(this.state.showLocations);
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
          />
          <Map locations={locations}/>
        </div>
      </Fragment>
    )
  }
}

export default App;
