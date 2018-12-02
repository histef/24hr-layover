import React, { Component } from 'react';


class ListView extends Component {
  state={
    //conditional for when list items are ready to render at onset
    fsIsLoaded: false
  }

  // when this.state.filteredVenues has loaded, set fsIsLoaded
  componentDidUpdate(prevProps,prevState){
    if(prevProps.filteredVenues !== this.props.filteredVenues){
      this.setState({fsIsLoaded: true})
    }
  }

  handleClick = (id) => {
    let venueId = this.props.markers[id].venueId;
    this.props.showMarker(this.props.markers[id])
    this.props.showVenueDesc(venueId)
}

  render(){
  return(
    <ul className='list'>

    {this.state.fsIsLoaded
    ? this.props.filteredVenues.map((venue, index) => {
      if(venue !== null){
      return(
      <li key={venue.data.response.venue.id}
          className='list-item'
          id={venue.data.response.venue.id}
          tabIndex='0'
          onClick={()=>this.handleClick(index)}
          >{venue.data.response.venue.name}
      </li>
      )
    }
    return venue;
  }
  )
    : this.props.venues.length > 0
    ? this.props.filteredVenues.map((venue, index) => {
      if(venue !== null){
      return(
      <li key={venue.data.response.venue.id}
          className='list-item'
          id={venue.data.response.venue.id}
          tabIndex='0'
          onClick={()=>this.handleClick(index)}
          onKeyDown={()=>this.handleClick(index)}
          >{venue.data.response.venue.name}
      </li>
      )
    }
    return venue;
  }
  )
    : <li>Loading...</li>
    }
    </ul>
    )
  }

}

export default ListView

