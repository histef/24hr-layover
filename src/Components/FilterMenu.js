import React from 'react';

function FilterMenu(props) {
  return (

    <div className='filter-menu'>
      <div className='filter-header'>
        <h2>Filter Menu</h2>
        <button className="icon" onClick={props.responsiveFilterMenu}>
          {
            props.filterMenuIsOpen
            ? <i className="fas fa-bars"></i>
            : <i className="fas fa-times"></i>
          }
        </button>
      </div>
      <div className='dropdown'>
        <p>DROP-DOWN MENU</p>
        <div className='dd-results'>
          <p>place a</p>
          <p>place b</p>
        </div>
      </div>
    </div>
  )
}

export default FilterMenu

// TODO: dropdown Menu
// TODO: grab the markers/infowindows