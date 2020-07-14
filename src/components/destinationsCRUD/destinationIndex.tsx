// available to userRole = "user"
// this is where you GET, http://localhost:3000/destination GET
import React from "react";
import { Table, Button, Row, Col, Container } from "reactstrap";
import { TextField, FormLabel } from "@material-ui/core/";
import Maps from "./maps";
// import {Map, GoogleApiWrapper} from 'google-maps-react'

type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueTypes = {
  lottoLocation: string;
  lottoAddress: string;
  setUpdateActive: boolean;
  destinationTable: [];
  setUpdateLoco: {};
};

export default class Destinations extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      lottoLocation: "",
      lottoAddress: "",
      setUpdateActive: false,
      destinationTable: [],
      setUpdateLoco: {},
    };
  }

  editUpdateLocation = (loco: any) => {
    console.log(loco);
    this.setState({ setUpdateLoco: loco });
  };

  updateOn = () => {
    this.setState({ setUpdateActive: true });
  };
  updateOff = () => {
    this.setState({ setUpdateActive: false });
  };

  //fetching all destinations
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
          destinationTable: destinationInfo.destinations,
        });
        console.log("Destination state variable", this.state.destinationTable);
      });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("http://localhost:3000/destination/", {
      method: "POST",
      body: JSON.stringify({
        lottoLocation: this.state.lottoLocation,
        lottoAddress: this.state.lottoAddress,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // this.props.token(data.sessionToken);
        console.log("Testingthis", data);
        // this.props.updateUsername(data.user.username);
        // this.props.updateMessage(data.message);
        // this.props.updateUserRole(data.user.userRole);
        this.setState({ lottoAddress: "" });
        this.setState({ lottoLocation: "" });
        this.fetchDestinations();
      });
  };

  destinationWrapper = () => {
    return this.state.destinationTable.map((location: any, index) => {
      return (
        <tr key={index}>
          <td>{location.lottoLocation}</td>
          <td>{location.lottoAddress}</td>
          <td>
            <Button
              onClick={() => {
                this.editUpdateLocation(location);
                this.updateOn();
              }}
            >
              Update
            </Button>
          </td>
          <td></td>
        </tr>
      );
    });
  };

  componentWillMount() {
    console.log("Im about to mount");
  }

  componentDidMount() {
    console.log("Component Mounted");
    this.fetchDestinations();
    this.destinationWrapper();
  }

  Welcoming() {
    return localStorage.getItem("message") === null ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Sign up or Login to see your Ratings!
      </h1>
    ) : localStorage.getItem("message") === "user succesfully logged in" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        All Locations for you {localStorage.getItem("username")}
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome,{localStorage.getItem("username")}
      </h1>
    ) : (
      "null"
    );
  }
  render() {
    return (
      <div>
        <h1>{this.Welcoming()}</h1>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Lottery Location</th>
                  <th>Lottery Address</th>
                </tr>
              </thead>
              <tbody>{this.destinationWrapper()}</tbody>
            </Table>
          </Col>
          <Container>
            <Col>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <FormLabel>Add A Lotto Location!</FormLabel>
                <div>
                  <TextField
                    label="Lotto Location Name"
                    id="outlined-margin-normal"
                    defaultValue="Location Name"
                    // className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) =>
                      this.setState({ lottoLocation: e.target.value })
                    }
                    value={this.state.lottoLocation}
                  />
                  <br />
                  <TextField
                    label="Lotto Address"
                    id="outlined-margin-normal"
                    defaultValue="Location Address"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) =>
                      this.setState({ lottoAddress: e.target.value })
                    }
                    value={this.state.lottoAddress}
                  />
                </div>
                <button type="submit">New Location!!</button>
              </form>
            </Col>
            <Col>
              <Maps />
              {/* this displays all of our locations on a google map, still working on it tho */}
            </Col>
          </Container>
        </Row>
      </div>
    );
  }
}
