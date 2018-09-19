import React from 'react';

function FoursquareInfo(props){
  return (
    <div className="foursquare-info">
    <p>USER-ID:{props.foursquareData.userID}</p>
      <p>TITLE:{props.foursquareData.title}</p>
    </div>
  )
}

export default FoursquareInfo;