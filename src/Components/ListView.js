import React, { Component } from 'react';


class ListView extends Component {
  state={
    fsIsLoaded: false //conditional for when list items are ready to render at onset
  }

  // when this.state.venues has loaded, set fsIsLoaded
  componentDidUpdate(prevProps,prevState){
    if(prevProps.venues !== this.props.venues){
      this.setState({fsIsLoaded: true})
    }
  }

  handleClick = (id) => {
  this.props.showMarker(this.props.markers[id])
  // console.log(this.props.markers[id])
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
          onClick={()=>this.handleClick(index)}
          >{venue.response.venue.name}
      </li>
      )
    }
  }
  )
    : this.props.venues.length > 0
    ? this.props.showLocations.map((venue, index) => {
      if(venue !== null){
      return(
      <li key={venue.response.venue.id}
          className='list-item'
          id={venue.response.venue.id}
          onClick={()=>this.handleClick(index)}>{venue.response.venue.name}</li>
      )
    }
  }
  )
    :<li>Loading...</li>
    }
    </ul>
    )
  }

}

export default ListView