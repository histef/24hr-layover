import React from 'react';
import SearchField from './SearchField'
import ListView from './ListView'

function FilterMenu(props) {

  //handles closed filter menu layout for larger screens
  if (window.innerWidth > 770 && props.filterMenuIsOpen === false) {
    return (
      <aside className='filter-menu' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, position: 'fixed', top: 247, width: 45, height: 70, backgroundColor: '#e47f00'}}>
        <button aria-label="close" className="icon"  onClick={props.onToggleFilterMenu}>
          {
            props.filterMenuIsOpen
            ? <i className="fas fa-times"></i>
            : <i className="fas fa-bars"></i>
          }
        </button>
      </aside>
    )
  }

  //handles closed filter menu layout for smaller screens
  else if (window.innerWidth < 770 && props.filterMenuIsOpen === false) {
    return (
      <aside className='filter-menu'>
        <div className='filter-header'>
          <h2>Filter Menu</h2>
          <button aria-label="close" className="icon" onClick={props.onToggleFilterMenu}>
            {
              props.filterMenuIsOpen
              ? <i className="fas fa-times"></i>
              : <i className="fas fa-bars"></i>
            }
          </button>
        </div>
      </aside>
    )
  }

  //open filter menu layout
  else {
    return (
      <aside className='filter-menu'>
      <div className='filter-header'>
        <h2>Filter Menu</h2>
        <button aria-label="close" className="icon" onClick={props.onToggleFilterMenu}>
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
          showVenueDesc={props.showVenueDesc}
          value={props.value}
          filteredVenues={props.filteredVenues}
          markers={props.markers}
          venues={props.venues}
          showMarker={props.showMarker}
        />
      </aside>
    )
  }
}

export default FilterMenu

