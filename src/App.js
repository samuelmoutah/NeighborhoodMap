import React, { Component }from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "U02WBXTTFQTWRV2ZP0SY0E0TAUEZOMDM3H2DH23OOJDLRTT5",
      client_secret: "OJJIQB20UBKBKBYEXDFMFUAHLXJ2ICEZ441CSXPQ32S5EVCJ",
      query: "food",
      near: "Midvale",
      v: "20182507" 
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        })
      })
      .catch(error => {
        console.log("Error!!" + error)
      })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'),
     {
       center: {lat: 40.626162, lng: -111.911355},
       zoom: 16
     })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;
