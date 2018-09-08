import React, { Fragment } from 'react';

function SearchField(props){
  return (
    <Fragment>
      <form>
            <input
              type="text"
              placeholder="Search location"
              value={props.value}
              onChange={(event) => props.onUpdateSearch(event.target.value)}
            />
      </form>
    </Fragment>
  )
}

export default SearchField