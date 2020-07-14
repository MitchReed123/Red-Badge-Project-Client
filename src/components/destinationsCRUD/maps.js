import React from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  google,
  maps,
} from "google-maps-react";
import { Button } from "antd";
//App
class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [
        { latitude: 39.77351, longitude: -86.00991, name: "TESTING" },
        { latitude: 39.784428, longitude: -86.157935, name: "TESTING" },
        { latitude: 39.760651, longitude: -86.167802, name: "TESTING" },
        { latitude: 39.769476, longitude: -86.149266, name: "TESTING" },
        { latitude: 39.771962, longitude: -86.151666, name: "TESTING" },
        { latitude: 39.773709, longitude: -86.152771, name: "TESTING" },
        { latitude: 39.773509, longitude: -86.162382, name: "TESTING" },
        { latitude: 39.752142, longitude: -86.165615, name: "TESTING" },
        { latitude: 39.751977, longitude: -86.150123, name: "TESTING" },
        { latitude: 39.779795, longitude: -86.154454, name: "TESTING" },
        { latitude: 39.751161, longitude: -86.149178, name: "TESTING" },
        { latitude: 39.748411, longitude: -86.159638, name: "TESTING" },
        { latitude: 39.754056, longitude: -86.142157, name: "TESTING" },
        { latitude: 39.747954, longitude: -86.149771, name: "TESTING" },
        { latitude: 39.781418, longitude: -86.170486, name: "TESTING" },
        { latitude: 39.784428, longitude: -86.157935, name: "TESTING" },
        { latitude: 39.767625, longitude: -86.130987, name: "TESTING" },
        { latitude: 39.686935, longitude: -86.139121, name: "TESTING" },
        { latitude: 39.763981, longitude: -86.130333, name: "TESTING" },
        { latitude: 39.752828, longitude: -86.134558, name: "TESTING" },
        { latitude: 39.788056, longitude: -86.159105, name: "TESTING" },
        { latitude: 39.788072, longitude: -86.156943, name: "TESTING" },
        { latitude: 39.745652, longitude: -86.13953, name: "TESTING" },
        { latitude: 39.745439, longitude: -86.140225, name: "TESTING" },
        { latitude: 39.774054, longitude: -86.12877, name: "TESTING" },
        { latitude: 39.789185, longitude: -86.148128, name: "TESTING" },
        { latitude: 39.760053, longitude: -86.126983, name: "TESTING" },
        { latitude: 39.768039, longitude: -86.125819, name: "TESTING" },
        { latitude: 39.750038, longitude: -86.130322, name: "TESTING" },
        { latitude: 39.788774, longitude: -86.144282, name: "TESTING" },
        { latitude: 39.750422, longitude: -86.188034, name: "TESTING" },
        { latitude: 39.775808, longitude: -86.186863, name: "TESTING" },
        { latitude: 39.737669, longitude: -86.159599, name: "TESTING" },
        { latitude: 39.752122, longitude: -86.126796, name: "TESTING" },
        { latitude: 39.76572, longitude: -86.196124, name: "TESTING" },
        { latitude: 39.74524, longitude: -86.130887, name: "TESTING" },
        { latitude: 39.766683, longitude: -86.196491, name: "TESTING" },
        { latitude: 39.739096, longitude: -86.139431, name: "TESTING" },
        { latitude: 39.735799, longitude: -86.154612, name: "TESTING" },
        { latitude: 39.738032, longitude: -86.140271, name: "TESTING" },
        { latitude: 39.734658, longitude: -86.154583, name: "TESTING" },
        { latitude: 39.774486, longitude: -86.196507, name: "TESTING" },
        { latitude: 39.795357, longitude: -86.162007, name: "TESTING" },
        { latitude: 39.781104, longitude: -86.124471, name: "TESTING" },
        { latitude: 39.765287, longitude: -86.159165, name: "TESTING" },
      ],
      testingThis: [],
      againTesting: [],
    };
  }
  //comment this out if i dont get this working
  fetchDestinations = () => {
    fetch("http://localhost:3000/destination/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((destinationInfo) => {
        console.log("destinations", destinationInfo);
        this.setState({
          testingThis: destinationInfo.destinations,
        });
        console.log("Testing this tho", this.state.testingThis);
      });
  };

  destinationWrapper = () => {
    return this.state.testingThis.map((location, index) => {
      return (
        <div>
          <p>{location.lottoAddress}</p>
        </div>
      );
    });
  };

  // testingMapper = () => {
  //   return this.state.testingThis.map((locations, index) => {
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${locations.lottoAddress}&key=AIzaSyDPBwqLrvIZeZQ8saAANa3WsOlcvdkUAgE`
  //     )
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log("testingthisapi", res.geometry);
  //         // console.log("testingtwo", res.results);
  //         this.setState({
  //           againTesting: res.results,
  //         });
  //         console.log("testing state variable");
  //       });

  //     return this.state.locations.map((store, index) => {
  //       return (
  //         <Marker
  //           key={index}
  //           id={index}
  //           position={{
  //             lat: store.latitude,
  //             lng: store.longitude,
  //           }}
  //           onClick={() => {
  //             console.log(locations.lottoLocation);
  //           }}
  //         />
  //       );
  //     });
  //   });
  // };

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
          //need to figure out how to make this InfoWindow to work so it displays the name/address of each location as well in the popup window
          onClick={() => {
            new InfoWindow({
              content: `<p>${store.longitude}${store.latitude}</p>`,
            });
            console.log("testing");
          }}
        />
      );
    });
  };

  componentDidMount() {
    this.fetchDestinations();
    // this.testingMapper();
  }

  render() {
    return (
      <div>
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
          {/* {this.testingMapper()} */}
        </Map>
        {/* {this.destinationWrapper()} */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPBwqLrvIZeZQ8saAANa3WsOlcvdkUAgE",
})(Maps);
