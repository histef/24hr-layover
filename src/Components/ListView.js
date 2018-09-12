import React from 'react';

function ListView(props){

  return (

    <ul className="list" onClick={e => {props.updateChosenLoc(e.target.id)}}>
      {props.showLocations.map(location => (
        <li
          key={location.id}
          id={location.id}
          className="list-item"
           >
        {location.title}</li>
      ))}
    </ul>
  )
}

export default ListView

//get the same error using ↓ object still undefined
//onClick={e=>props.markers[e.target.id].setAnimation(window.google.maps.Animation.BOUNCE)}