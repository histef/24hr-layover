import React, { Component } from 'react';


class ListView extends Component {
  state={
    //conditional for when list items are ready to render at onset
    fsIsLoaded: false
  }

  // when this.state.venues has loaded, set fsIsLoaded
  componentDidUpdate(prevProps,prevState){
    if(prevProps.venues !== this.props.venues){
      this.setState({fsIsLoaded: true})
    }
  }

  handleClick = (id) => {
    this.props.showMarker(this.props.markers[id])

}

  render(){
// console.log(this.props.showLocations);
  return(
    <ul className='list'>

    {this.state.fsIsLoaded
    ? this.props.showLocations.map((venue, index) => {
      if(venue !== null){
      return(
      <li key={venue.response.venue.id}
          className='list-item'
          id={venue.response.venue.id}
          tabIndex='0'
          onClick={()=>this.handleClick(index)}
          >{venue.response.venue.name}
      </li>
      )
    }
    return venue
  }
  )
    : this.props.venues.length > 0
    ? this.props.showLocations.map((venue, index) => {
      if(venue !== null){
      return(
      <li key={venue.response.venue.id}
          className='list-item'
          id={venue.response.venue.id}
          tabIndex='0'
          onClick={()=>this.handleClick(index)}
          onKeyDown={()=>this.handleClick(index)}
          >{venue.response.venue.name}
      </li>
      )
    }
    return venue
  }
  )
    :<li>Loading...</li>
    }
    </ul>
    )
  }

}

export default ListView

