import React, { Fragment,Component } from 'react'

import FilterMenu from './Components/FilterMenu.js'
import Map from './Components/Map'
import './App.css'

class App extends Component {
  state = {
    filterMenuIsOpen: true,
    getWidth: window.innerWidth
  }

  componentDidMount = () => {
    // this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ getWidth: window.innerWidth });
    console.log(this.state.getWidth)
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
          <Map />
        </div>
      </Fragment>
    )
  }
}

export default App;
