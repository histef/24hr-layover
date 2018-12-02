import React, { Fragment } from 'react';

//all this component needs to do is tell React what to render when this section is displayed

const FSDescription = (props) => {

  return (
    <div className="foursquare-desc">

    {props.clickedVenue.map(venue =>
      <Fragment>
        <p>{venue.data.response.venue.name}</p>
        <p>{venue.data.response.venue.description}</p>
        <img className='venueImg' src={`${venue.data.response.venue.bestPhoto.prefix}600x500${venue.data.response.venue.bestPhoto.suffix}`} alt='venue'/>
      </Fragment>
    )}
    </div>
  )
}

export default FSDescription;