import React, { Component } from 'react';

class Map extends Component{

  onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id), this.props.options);
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${API_key}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);

      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div
      style={{ width: '75vw', height: 500 }}
      id={this.props.id}
      />
    );
  }
}

const API_key = 'AIzaSyBYV5RDub92s1e3C9qL3nWNzNwjpokvpW0';

export default Map