import React, { Fragment } from 'react';

function SearchField(props){
  return (
    <Fragment>
      <form id="search-form">
        <input
          type="text"
          title="venue search"
          name="query"
          role="search"
          aria-label="searchfield"
          placeholder="Search location"
          value={props.value}
          onChange={(event) => props.onUpdateSearch(event.target.value)}
        />
      </form>
    </Fragment>
  )
}

export default SearchField