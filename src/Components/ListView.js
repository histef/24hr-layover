import React from 'react';

function ListView(props){
  return (
    <ul className="list">
      {props.locations.map(location => (
        <li key={location.id} className="list-item">{location.title}</li>
      ))}
    </ul>
  )
}

export default ListView
