import React from 'react';

function FilterMenu(props) {


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
          <div className='dropdown' style={{ display: 'none' }}>
          </div>
        </div>
      )
    }

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
}

export default FilterMenu

// TODO: dropdown Menu
// TODO: grab the markers/infowindows
// TODO: how to check width than either display: none or transition postiion to -45px;