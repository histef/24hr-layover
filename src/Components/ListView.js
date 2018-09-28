import React, { Fragment } from 'react';
import FoursquareInfo from './FoursquareInfo'

function ListView(props){

// let id = 0;
let fragID = 0;


  return (
    <ul className="list" onClick={(e)=> {props.animateMarker(e.target); props.toggleDbInfo(e.target);}}
    >
      {props.showLocations.map(location => {
        let filteredData = props.foursquareDb.filter(l => l.id === location.venueId)

          return(
        <Fragment key={fragID++}>
          <li
            key={location.id}
            id={location.id}
            className="list-item"
            >
            {location.title}

         {location.foursquareInfoIsShowing === true
            ? <FoursquareInfo
                className="foursquare-info"
                // key={location.id}
                style={{pointerEvents: 'none'}}
                filteredDb={filteredData}
              />
            : null
          }
        </li>
      </Fragment>
      )})}
    </ul>
  )
}

export default ListView

         // {location.foursquareInfoIsShowing === true
         //    ? <FoursquareInfo
         //        key={id++}
         //        filteredDb={props.filteredDb}
         //      />
         //    : null
         //  }

          // {location.foursquareInfoIsShowing === true
         //    ? props.foursquareDb
                  // .filter(l => l.id===location.venueId)
                  // /map(filteredData=>(
         //      <FoursquareInfo
         //        key={id++}
         //        filteredDb={props.filteredDb}
         //      />))
         //    : null
         //  }