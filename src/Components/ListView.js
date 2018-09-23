import React, { Fragment } from 'react';
import FoursquareInfo from './FoursquareInfo'

function ListView(props){

let id = 0;
let fragID = 0;

      // let listItemHTML = document.querySelector('.list-item');
      // if (listItem.style.display ==='none'){
      //   listItemHTML.style.display === 'block';
      // }
      // else{
      //   listItem.style.display === 'none';
      // }
            // {props.filteredDb} link to the matching foursquare data then render foursquare data

  return (
    <ul className="list" onClick={(e)=> {props.animateMarker(e.target); props.toggleDbInfo(e.target);}}
    >
      {props.showLocations.map(location => (
        <Fragment key={fragID++}>
          <li
            key={location.id}
            id={location.id}
            className="list-item"
            >
            {location.title}
            <FoursquareInfo
              key={id++}
              filteredDb={props.filteredDb}
        />
        </li>
      </Fragment>
      ))}
    </ul>
  )
}

export default ListView
