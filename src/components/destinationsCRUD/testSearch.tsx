import React from "react";
import { Input, Form, Container, Row, Col, Table } from "reactstrap";
type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueTypes = {
  destinationTable: [];
  searchTerm: string | any;
  searchResults: [] | any;
};

export default class Test extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      destinationTable: [],
      searchTerm: "",
      searchResults: [],
    };
  }

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

  handleChange = (event: any) => {
    this.setState({ searchTerm: event.target.value });
  };

  destinationWrapper = () => {
    return this.state.destinationTable.map((location: any, index) => {
      return (
        <tr key={index}>
          <td>{location.lottoLocation}</td>
          <td>{location.lottoAddress}</td>
          <td></td>
        </tr>
      );
    });
  };
  componentDidMount() {
    this.fetchDestinations();
    this.destinationWrapper();
    let word = this.state.searchTerm;
    let filtered = this.state.destinationTable.filter((result: any) => {
      if (result.lottoLocation.toLowerCase().include(word.toLowerCase())) {
        return result;
      } else {
        alert("CMON");
      }
    });

    this.setState({ searchResults: filtered });
  }

  render() {
    return (
      <div>
        <h3>Search for a location</h3>
        <Form>
          <Input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            aria-label="Search"
          />
        </Form>
        <Container>
          <Row>
            <Col>
              <Table>
                <tr>
                  {}
                  {/* <th>Lottery Location</th>
                    <th>Lottery Address</th> */}
                </tr>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <div>
  //         <h3>Search for a location</h3>
  //         <Form>
  //           <Input
  //             type="text"
  //             value={this.state.searchTerm}
  //             onChange={this.handleChange}
  //             aria-label="Search"
  //           />
  // <Container>
  //   {this.state.searchResults.map((item: any) => (
  //     <tr>

  //       <li>{item.lottoLocation}</li>
  //       <li>{item.lottoAddress}</li>
  //     </tr>
  //   ))}
  // </Container>
  //         </Form>
  //       </div>
  //     </div>
  //   );
  // }
}
