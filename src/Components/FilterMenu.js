import React from 'react';
import SearchField from './SearchField'
import ListView from './ListView'

function FilterMenu(props) {

    //handles closed filter menu layout for larger screens
    if (props.screenWidth > 770 && props.filterMenuIsOpen === false) {
      return (
        <div className='filter-menu' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',position: 'fixed', top: 191, width: 45, height: 29, backgroundColor: '#e6ac00'}}>
          <button className="icon"  onClick={props.onToggleFilterMenu}>
            {
              props.filterMenuIsOpen
              ? <i className="fas fa-times"></i>
              : <i className="fas fa-bars"></i>
            }
          </button>
        </div>
      )
    }

    //handles closed filter menu layout for smaller screens
    else if (props.screenWidth < 770 && props.filterMenuIsOpen === false) {
      return (
        <div className='filter-menu'>
          <div className='filter-header'>
            <h2>Filter Menu</h2>
            <button className="icon" onClick={props.onToggleFilterMenu}>
              {
                props.filterMenuIsOpen
                ? <i className="fas fa-times"></i>
                : <i className="fas fa-bars"></i>
              }
            </button>
          </div>
        </div>
      )
    }

    //open filter menu layout
    else {
      return (
        <div className='filter-menu'>
        <div className='filter-header'>
          <h2>Filter Menu</h2>
          <button className="icon" onClick={props.onToggleFilterMenu}>
            {
              props.filterMenuIsOpen
              ? <i className="fas fa-times"></i>
              : <i className="fas fa-bars"></i>
            }
          </button>
        </div>
          <SearchField
            onUpdateSearch={props.onUpdateSearch}
            onGetLocations={props.onGetLocations}
            value={props.value}
          />
          <ListView
            value={props.value}
            showLocations={props.showLocations}
            updateChosenLocation={props.updateChosenLocation}
            markers={props.markers}
            animateMarker={props.animateMarker}
            foursquareDb={props.foursquareDb}
            toggleDbInfo={props.toggleDbInfo}
            filteredDb={props.filteredDb}
            // locations={props.locations}
          />
        </div>
      )
    }
}

export default FilterMenu

