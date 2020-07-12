import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
//App

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
        { latitude: 39.77351, longitude: -86.00991 },
        { latitude: 39.784428, longitude: -86.157935 },
        { latitude: 39.760651, longitude: -86.167802 },
        { latitude: 39.769476, longitude: -86.149266 },
        { latitude: 39.771962, longitude: -86.151666 },
        { latitude: 39.773709, longitude: -86.152771 },
        { latitude: 39.773509, longitude: -86.162382 },
        { latitude: 39.752142, longitude: -86.165615 },
        { latitude: 39.751977, longitude: -86.150123 },
        { latitude: 39.779795, longitude: -86.154454 },
        { latitude: 39.751161, longitude: -86.149178 },
        { latitude: 39.748411, longitude: -86.159638 },
        { latitude: 39.754056, longitude: -86.142157 },
        { latitude: 39.747954, longitude: -86.149771 },
        { latitude: 39.781418, longitude: -86.170486 },
        { latitude: 39.784428, longitude: -86.157935 },
        { latitude: 39.767625, longitude: -86.130987 },
        { latitude: 39.686935, longitude: -86.139121 },
        { latitude: 39.763981, longitude: -86.130333 },
        { latitude: 39.752828, longitude: -86.134558 },
        { latitude: 39.788056, longitude: -86.159105 },
        { latitude: 39.788072, longitude: -86.156943 },
        { latitude: 39.745652, longitude: -86.13953 },
        { latitude: 39.745439, longitude: -86.140225 },
        { latitude: 39.774054, longitude: -86.12877 },
        { latitude: 39.789185, longitude: -86.148128 },
        { latitude: 39.760053, longitude: -86.126983 },
        { latitude: 39.768039, longitude: -86.125819 },
        { latitude: 39.750038, longitude: -86.130322 },
        { latitude: 39.788774, longitude: -86.144282 },
        { latitude: 39.750422, longitude: -86.188034 },
        { latitude: 39.775808, longitude: -86.186863 },
        { latitude: 39.737669, longitude: -86.159599 },
        { latitude: 39.752122, longitude: -86.126796 },
        { latitude: 39.76572, longitude: -86.196124 },
        { latitude: 39.74524, longitude: -86.130887 },
        { latitude: 39.766683, longitude: -86.196491 },
        { latitude: 39.739096, longitude: -86.139431 },
        { latitude: 39.735799, longitude: -86.154612 },
        { latitude: 39.738032, longitude: -86.140271 },
        { latitude: 39.734658, longitude: -86.154583 },
        { latitude: 39.774486, longitude: -86.196507 },
        { latitude: 39.795357, longitude: -86.162007 },
        { latitude: 39.781104, longitude: -86.124471 },
        { latitude: 39.765287, longitude: -86.159165 },
      ],
    };
  }
  displayMarkers = () => {
    return this.state.locations.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log("CLICKED")}
        />
      );
    });
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={{
          height: "450px",
          width: "450px",
          marginLeft: "325px",
          marginTop: "150px",
        }}
        initialCenter={{ lat: 39.791, lng: -86.148003 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPBwqLrvIZeZQ8saAANa3WsOlcvdkUAgE",
})(Maps);
