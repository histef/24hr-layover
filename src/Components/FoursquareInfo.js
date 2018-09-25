import React, { Fragment } from 'react';

//all this component needs to do is tell React what to render when this section is displayed

function FoursquareInfo(props){



  return (
    <div className="foursquare-info show">

    {props.filteredDb.map(venue =>
      <Fragment>
        <p>{venue.description}</p>
        <p>Phone: {venue.contact.formattedPhone}</p>
        <p>Rating: {venue.rating}</p>
      </Fragment>
    )}
    </div>
  )
}

export default FoursquareInfo;