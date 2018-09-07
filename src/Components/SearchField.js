import React, { Fragment } from 'react';

function SearchField(props){
  return (
    <Fragment>
      <form>
            <input
              type="text"
              placeholder="Search location"
              value={props.value}
              onChange={(event) => {props.onHandleSearch(event.target.value); props.onGetLocations()}}
            />
      </form>
    </Fragment>
  )
}

export default SearchField