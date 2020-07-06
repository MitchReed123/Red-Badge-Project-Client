// available to userRole = "user"
// this is where you GET, http://localhost:3000/destination GET
import React from "react";

type acceptedProps = {
  token: any;
};

export default class Destinations extends React.Component<acceptedProps> {
  render() {
    return (
      <div className="destination">
        <h1>Testing</h1>
        <p>{this.props.token}</p>
      </div>
    );
  }
}
