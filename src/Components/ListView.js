import React from 'react';

function ListView(props){
  return (
    <ul className="list">
      {props.showLocations.map(location => (
        <li key={location.id} className="list-item">{location.title}</li>
      ))}
    </ul>
  )
}

export default ListView
