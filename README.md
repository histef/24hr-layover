# Neighborhood Map Project

This is the final project for the Udacity Front-End Nanodegree. I was tasked to create a SPA using React. The app:

* displays a map (using an API of my choosing)
* with markers that point to a specific location
* and infowindows that contain more information(using a different API)
* there is also a searchfield/selection menu
* caches information using a service worker
* responsive
* accessible

![app on load](https://github.com/histef/neighborhood-map/blob/master/images/app%20on%20load.png)

![animated header, open infowindow](https://github.com/histef/neighborhood-map/blob/master/images/%20header%20animation%20and%20infowindow%20open.png)

This map is generated using the Google Maps API.
The venue information is from the Foursquare API.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

***
## Installation

### Requirements to run
Foursquare client id and secret.
**_You must provide your own client id and secret._** Simple place them in the fs.js file

1. Run the following in your terminal:
```
git clone https://github.com/histef/neighborhood-map.git
```

2. Run `npm install` to install the project dependencies.
3. Add Foursquare keys to fs.js file
4. Run the app using `npm start`.

***
## Service Worker
This project was created using create-react-app. This project will need to be run in production mode for the service worker to work as intended.

***
## APIs
* [Foursquare](https://developer.foursquare.com/)
* [Google Maps](https://cloud.google.com/maps-platform/)

***
## Dependencies
* [React](https://reactjs.org/)
* [Axios](https://github.com/axios/axios)