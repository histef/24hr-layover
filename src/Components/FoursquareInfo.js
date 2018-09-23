import React, { Fragment } from 'react';

//all this component needs to do is tell React what to render when this section is displayed

function FoursquareInfo(props){

  return (
    <div className="foursquare-info">
    {props.filteredDb.map(venue =>
      <Fragment>
        <p>Phone: {venue.contact.phone}</p>
        <p>Rating: {venue.rating}</p>
      </Fragment>
    )}
    </div>

  )
}

export default FoursquareInfo;