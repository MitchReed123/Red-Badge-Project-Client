// available to userRole = "user"
// this is where you GET, http://localhost:3000/destination GET
import React from "react";
import { Row, Col, Container, Input, Label, Form } from "reactstrap";
import "./destinationIndex.css";
import APIURL from "../../helpers/environment";
// import { Button, Row, Col, Container } from "reactstrap";
import { TextField, FormLabel } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Maps from "./maps";
import { findByLabelText } from "@testing-library/react";
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

//STYLING
const styles = {
  welcome: {
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "70px",
    marginTop: "40px",
    marginBottom: "40px",
    marginLeft: "35%",
    marginRight: "35%",
    color: "#f2f2f2",
    alignContent: "center",
  },

  root: {
    width: "100%",
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    border: "10px solid rgba(69, 54, 179, 0.8)",
  },

  container: {
    maxHeight: "500px",
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
  },

  tableHeader: {
    width: "auto",
    backgroundColor: "#4536b3",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
    color: "#f2f2f2",
  },

  newLocationForm: {
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    width: "60%",
    height: "500px",
    // marginRight: "20px",
    marginLeft: "5%",
    marginTop: "5%",
    // justifyContent: "center"
  },

  // map: {
  //   backgroundColor: "#4536b3",
  //   width: "80%",
  //   marginRight: "5%",
  //   marginLeft: "5%",
  // }
};

// MATERIAL UI FIXED TABLE
interface Column {
  id: "lottoLocation" | "lottoAddress";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "lottoLocation", label: "Lottery Location", minWidth: 100 },
  { id: "lottoAddress", label: "Lottery Address", minWidth: 100 },
  // { id: 'update', label: 'Update', minWidth: 100 },
  // { id: 'delete', label: 'Delete', minWidth: 100 },
];

class Destinations extends React.Component<acceptedProps, valueTypes> {
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
    fetch(`${APIURL}/destination/`, {
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
    fetch(`${APIURL}/destination/`, {
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
            {/* <Button
              onClick={() => {
                this.editUpdateLocation(location);
                this.updateOn();
              }}
            >
              Update
            </Button> */}
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
        Lottery locations for {localStorage.getItem("username")}!
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome, {localStorage.getItem("username")}
      </h1>
    ) : (
      "null"
    );
  }
  render() {
    return (
      <div>
        <Row>
          <div style={styles.welcome}>
            <h1>{this.Welcoming()}</h1>
          </div>
        </Row>
        <Row xs="12">
          <Col md="7" id="col-one" style={styles.root}>
            <h1 className="table-header">Places to Buy Lottery Tickets</h1>
            {/* MATERIAL UI FIXED TABLE */}
            <Paper>
              <TableContainer style={styles.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          // style={{ minWidth: column.minWidth }}
                          style={styles.tableHeader}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.destinationWrapper()}</TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Col>
          <Col md="4" id="col-two" style={styles.newLocationForm}>
            {/* <Row> */}

            <Container>
              <Form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <Label id="add-newlocation">Add A Lotto Location!</Label>
                {/* <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <FormLabel>Add A Lotto Location!</FormLabel> */}
                <div>
                  <Input
                    id="newlocation-input"
                    type="text"
                    name="Lotto Location Name"
                    placeholder="Location"
                    onChange={(e) =>
                      this.setState({ lottoLocation: e.target.value })
                    }
                    value={this.state.lottoLocation}
                  />
                  {/* <br /> */}
                  <Input
                    id="newlocation-input"
                    type="text"
                    name="Lotto Location Address"
                    placeholder="Location Address"
                    onChange={(e) =>
                      this.setState({ lottoAddress: e.target.value })
                    }
                    value={this.state.lottoAddress}
                  />
                  <button id="newLocation-button" type="submit">
                    Add New Location!
                  </button>
                </div>
              </Form>
            </Container>
            {/* </Row> */}
          </Col>
        </Row>

        <Row md="9">
          {/* <Col style={styles.map}> */}
          {/* <Container > */}
          <Maps />
          {/* this displays all of our locations on a google map, still working on it tho */}
          {/* </Container> */}
          {/* </Col>          */}
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(Destinations);
