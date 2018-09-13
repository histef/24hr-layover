import React from 'react';

function ListView(props){

  return (
    <ul className="list" onClick={props.animateMarker}
    >
      {props.showLocations.map(location => (
        <li key={location.id} id={location.id} className="list-item">{location.title}</li>
      ))}
    </ul>
  )
}

export default ListView


// e => {
//       let marker = props.markers[e.target.id]
//       marker.setAnimation(window.google.maps.Animation.BOUNCE);
//         setTimeout(() => {
//           marker.setAnimation(null);
//         }, 1500);
//       }