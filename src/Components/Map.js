import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    clientId,
    clientSecret
} from '../config'

let marker;
let map;
let infowindow;
// let filteredData;

let venueData = [];

class Map extends Component {
    constructor() {
        super();
        this.state = {
            locations: [{
                title: 'Bacchanal Fine Wine & Spirits',
                location: {
                    lat: 29.9598,
                    lng: -90.0332
                },
                venueId: '4adbaabff964a520e62921e3',
                id: 0,
                foursquareInfoIsShowing: false
            }, {
                title: 'Bourbon Street',
                location: {
                    lat: 29.9540,
                    lng: -90.0698
                },
                venueId: '4c41e11a520fa593d744caac',
                id: 1,
                foursquareInfoIsShowing: false
            }, ],
        }
    }

    componentDidMount() {
        this.googleChecker()
    }

    // componentDidUpdate(prevProps, prevState) {
    //   // only update chart if the data has changed
    //   if (prevProps.chosenLocation !== this.props.chosenLocation) {
    //      this.state.markers[this.props.chosenLocation].setAnimation(window.google.maps.Animation.BOUNCE)
    //   }
    // }

    //check if google maps API is ready to use
    googleChecker = () => {
        if (!window.google) {
            console.error("Google API did not load yet");
        } else {
            //google maps API is ready, so render the map
            this.initMap();
        }
    }

    getVenueData(location) {
        const locID = location.venueId;

    }

    initMap = () => {
        const options = {
                zoom: 13,
                center: {
                    lat: 29.9511,
                    lng: -90.0600
                }
            }
            // create map instance
        map = new window.google.maps.Map(this.mapContainer, options)


        console.log(venueData);

        //for each location, create marker and add animation event
        let newMarkers = [];

        this.props.locations.map(location => {
            console.log(location);

            let filteredData = this.getVenueData(location)

            let position = location.location;
            let title = location.title;
            let id = location.id;
            let venueId = location.venueId;


            //creates each marker
            let marker = new window.google.maps.Marker({
                map,
                position,
                title,
                animation: window.google.maps.Animation.DROP,
                id,
                venueId
            })

            let infowindow;

            fetch(`https://api.foursquare.com/v2/venues/${location.venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&near=new_orleans`)
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    infowindow = new window.google.maps.InfoWindow({
                        content: `<p>${title}</p>
                       <p>${res.response.venue.description}</p>`
                    });

                    //animate marker when clicked on, must go before return value to add the listener to each marker
                    this.animateClickedMarker(marker, infowindow);

                    //must return a value: array-callback-return
                    newMarkers.push(marker);
                })
                .catch(error => console.log(error))

        })
          window.testMe = newMarkers
        //update marker array in App.js (outside of map function)
        this.props.getMarkers(newMarkers)
    }

    animateClickedMarker = (clickedMarker, correspondingInfoWindow) => {
        clickedMarker.addListener('click', function() {
            this.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => {
                this.setAnimation(null);
            }, 1500);
            correspondingInfoWindow.open(map, clickedMarker);
      })
    }

    sendToFoursquare = (chosenMarker) => {
        const index = Number(chosenMarker.venueId);
    }


    render() {
        return ( <
            div style = {
                {
                    width: '75vw',
                    height: 500
                }
            }
            id = "map"
            ref = {
                div => {
                    this.mapContainer = div
                }
            } >
            <
            /div>
        );
    }
}

export default Map

//TODO
//infowindow
//fetch foursquare data and use to create infowindow content.but need
// to pass to list item too...so maybe foursquare info should be in app.js
// looks like data gets passed to state using setstate in promise.

// Resources
// https://stackoverflow.com/questions/33272267/google-maps-events


// import React, { Component } from 'react';

// let marker;
// let map;
// let infowindow;
// // let filteredData;

// class Map extends Component{

//   componentDidMount(){
//     this.googleChecker()
//   }

//   //check if google maps API is ready to use
//   googleChecker = () => {
//     if(!window.google) {
//       console.error("Google API did not load yet");
//     } else {
//       //google maps API is ready, so render the map
//       this.initMap();
//     }
//   }

//   initMap = () => {
//     const options = {
//       zoom: 13,
//       center: {lat: 29.9511,lng: -90.0600}
//     }
//     // create map instance
//     map = new window.google.maps.Map(this.mapContainer, options)

//     //for each location, create marker and add animation event
//     let newMarkers = this.props.locations.map(location => {
//       let position = location.location;
//       let title = location.title;
//       let id = location.id;
//       let venueId = location.venueId;

//             //getting the foursquare info
//       let filteredData = this.props.foursquareDb.filter(l => l.id === location.venueId)

//       //creates each marker
//       marker = new window.google.maps.Marker({
//       map,
//       position,
//       title,
//       animation: window.google.maps.Animation.DROP,
//       id,
//       venueId
//       })


//       infowindow = new window.google.maps.InfoWindow({
//         content: `<p>${title}</p>
//                   <p>${filteredData.description}</p>`
//       });

//       //animate marker when clicked on, must go before return value to add the listener to each marker
//       this.animateClickedMarker(marker, infowindow);

//       //must return a value: array-callback-return
//       return marker;

//     })

//       //update marker array in App.js (outside of map function)
//       this.props.getMarkers(newMarkers)
//   }

//   animateClickedMarker = (clickedMarker, correspondingInfoWindow) => {
//     clickedMarker.addListener('click', function(){
//       this.setAnimation(window.google.maps.Animation.BOUNCE);
//       setTimeout(() => {
//         this.setAnimation(null);
//       }, 1500);
//       correspondingInfoWindow.open(map, clickedMarker);
//       console.log(`animateclickedmarker ${this.venueId}`) //it saved venueId
//     })
//   }

//   sendToFoursquare = (chosenMarker) => {
//     const index = Number(chosenMarker.venueId);
//     // console.log(`send to foursquare ${chosenMarker.venueId}`)
//   }


//   //if animate clickedMarker === true then return <foursquareInfo

//   render(){
//     return(
//         <div
//           style={{ width: '75vw', height: 500 }}
//           id="map"
//           ref={div => {this.mapContainer = div}}>
//       </div>
//     );
//   }
// }

// export default Map

//TODO
  //infowindow
  //fetch foursquare data and use to create infowindow content.but need
  // to pass to list item too...so maybe foursquare info should be in app.js
  // looks like data gets passed to state using setstate in promise.

  // Resources
  // https://stackoverflow.com/questions/33272267/google-maps-events
