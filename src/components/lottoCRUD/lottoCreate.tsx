//grabbing from lotto table, and the http://localhost:3000/lotto/, POST
import React from "react";

import { Container, Table, Button, Row, Col, Label, Input } from "reactstrap";
import { TextField, FormLabel, Select } from "@material-ui/core/";
import { stringify } from "querystring";
import "./lottoCreate.css";
import APIURL from "../../helpers/environment";

// import { Container, Col, Input } from "reactstrap";
// import { TextField, FormLabel } from "@material-ui/core/";

type acceptedProps = {
  token: string | any;
  fetchLottos: any;
  // destinations: any;
};

type valueTypes = {
  lottoNum: string;
  nameOfLotto: string;
  lottoPot: string;
  location: any | [];
  random: number;
  destinationTable: [] | any;
  displayData: [];
};

export default class LottoCreate extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      //if i can call a function somewhere on the math equation i can make the numbers below 10 have a 0 before them
      //if(this.state.lottoNum < 10){
      //   function for the add zero
      // } else {
      //   this.state.lottoNum
      // }
      lottoNum:
        Math.floor(1 + Math.random() * 49) +
        "-" +
        Math.floor(1 + Math.random() * 49) +
        "-" +
        Math.floor(1 + Math.random() * 49) +
        "-" +
        Math.floor(1 + Math.random() * 49) +
        "-" +
        Math.floor(1 + Math.random() * 49) +
        "-" +
        Math.floor(1 + Math.random() * 49),
      // Math.floor(100000000000 + Math.random() * 900000000000),
      nameOfLotto: "",
      lottoPot: "",
      location: [],
      random: 0,
      destinationTable: [],
      displayData: [],
    };
  }

  // randomNum = () => {
  //   this.setState({
  //     lottoNum: Math.floor(100000000000 + Math.random() * 900000000000),
  //   });
  // };

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${APIURL}/lotto/`, {
      method: "POST",
      body: JSON.stringify({
        lottoNum: this.state.lottoNum,
        nameOfLotto: this.state.nameOfLotto,
        lottoPot: this.state.lottoPot,
        location: this.state.location,
      }),
      headers: new Headers({
        "content-type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          lottoNum:
            Math.floor(1 + Math.random() * 49) +
            "-" +
            Math.floor(1 + Math.random() * 49) +
            "-" +
            Math.floor(1 + Math.random() * 49) +
            "-" +
            Math.floor(1 + Math.random() * 49) +
            "-" +
            Math.floor(1 + Math.random() * 49) +
            "-" +
            Math.floor(1 + Math.random() * 49),
        });
        this.setState({ nameOfLotto: "" });
        this.setState({ lottoPot: "" });
        this.setState({ location: <option>Select a Location!</option> });
        this.props.fetchLottos();
      });
  };
  //im going to have to map over the location table and set it equal to a drop down list, should be able to do it by setting the map data to a li wrapped in a ul
  componentDidMount() {
    this.props.fetchLottos();
    this.fetchLocos();
  }
  fetchLocos = () => {
    fetch(`${APIURL}/destination/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((locoData) => {
        // im going to have to do what john did i think to run over an entire array of items and display them all in a dropdown list on the options tab, he sent me the code for that during the 24hour project so i should be able to do it. i hope this whole thing isnt a waste of time tbh
        console.log("loco data", locoData.destinations);
        this.setState({
          destinationTable: locoData.destinations,
        });
        console.log("Destinations tho", this.state.location);
      });
  };
  destinationWrapper = () => {
    return this.state.destinationTable.map((location: any, index: any) => {
      return (
        <ul key={index}>
          <li>{location.lottoLocation}</li>
          <li>{location.lottoAddress}</li>
        </ul>
      );
    });
  };
  render() {
    return (
      <div>
        <Container id="form">
          <h1 className="header">Generate a Lotto Number!</h1>
          <Col>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <p className="generator-info">
                Click the button to generate a new lotto number then fill in the
                form to add to your lottery numbers.{" "}
              </p>
              <div>
                <Input
                  id="newlotto-input"
                  type="text"
                  name="Lotto Number"
                  placeholder="Generated Lottery Number"
                  onChange={(e: any) =>
                    this.setState({ lottoNum: e.target.value })
                  }
                  value={this.state.lottoNum}
                />

                <Input
                  id="newlotto-input"
                  type="text"
                  name="Name of lotto"
                  placeholder="Name of Lottery"
                  onChange={(e) =>
                    this.setState({ nameOfLotto: e.target.value })
                  }
                  value={this.state.nameOfLotto}
                />
                <Input
                  id="newlotto-input"
                  type="text"
                  name="Lotto Pot"
                  placeholder="Pot Amount"
                  onChange={(e) => this.setState({ lottoPot: e.target.value })}
                  value={this.state.lottoPot}
                />
                <Input
                  id="locos"
                  defaultValue="Location"
                  onChange={(e) => this.setState({ location: e.target.value })}
                  value={this.state.location}
                  type="select"
                >
                  <option>Select a Lottery Ticket Location!</option>
                  {this.state.destinationTable.map((loco: any, index: any) => (
                    <option key={index}>
                      {loco.lottoLocation}, {loco.lottoAddress}
                    </option>
                  ))}
                </Input>
              </div>
              <button type="submit">New Lotto!</button>
            </form>
          </Col>
        </Container>
      </div>
    );
  }
}
