import React, { Fragment } from 'react';
import FoursquareInfo from './FoursquareInfo'

function ListView(props){

let id = 0;
let fragID = 0;

  return (
    <ul className="list" onClick={props.animateMarker}
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
              foursquareData={props.foursquareData}
        />
        </li>
      </Fragment>
      ))}
    </ul>
  )
}

export default ListView
