// available to userRole = "user"
// this is where you GET, http://localhost:3000/destination GET
import React from "react";
import { Button, Row, Col, Container, Input, Label } from "reactstrap";
import { TextField, FormLabel } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./destinationIndex.css";



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
  root: {
    width: "1000px",
    backgroundColor: "#f2f2f2",
    border: "10px solid #4536b3"
  },

  container: {
    maxHeight: "500px",
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px"
  },

  tableHeader: {
    width: "auto",
    backgroundColor: "#4536b3",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
    color: "#f2f2f2"
  },

  newLocationForm: {
    backgroundColor: "#4536b3",
    width: "50%",
    height: "400px",
    marginRight: "30%",
    marginLeft: "30%",
    
  }
};

// MATERIAL UI FIXED TABLE
interface Column {
  id: 'lottoLocation' | 'lottoAddress';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'lottoLocation', label: 'Lottery Location', minWidth: 100 },
  { id: 'lottoAddress', label: 'Lottery Address', minWidth: 100 },
  // { id: 'update', label: 'Update', minWidth: 100 },
  // { id: 'delete', label: 'Delete', minWidth: 100 },

];

class Destinations extends React.Component<
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
        All Locations
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
          <h1 className="table-header">Places to Buy Lottery Tickets</h1>
             {/* MATERIAL UI FIXED TABLE */}
             <Paper style={styles.root}>
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
                <TableBody>
                  {this.destinationWrapper()}
                  {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })} */}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
          </Paper>
            {/* <Table id="location-table">
              <thead>
                <tr>
                  <th>Lottery Location</th>
                  <th>Lottery Address</th>
                </tr>
              </thead>
              <tbody>{this.destinationWrapper()}</tbody>
            </Table> */}
          </Col>
          <Col>
          <Container>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit} style={styles.newLocationForm}>
                <Label id="add-newlocation">Add A Lotto Location!</Label>
              {/* <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <FormLabel>Add A Lotto Location!</FormLabel> */}
                <div>
                  <Input id="newlocation-input"
                    type="text"
                    name="Lotto Location Name"
                    placeholder="Location"
                    // label="Lotto Location Name"
                    // id="outlined-margin-normal"
                    // defaultValue="Location Name"
                    // className={classes.textField}
                    // margin="normal"
                    // variant="outlined"
                    onChange={(e) =>
                      this.setState({ lottoLocation: e.target.value })
                    }
                    value={this.state.lottoLocation}
                  />
                  <br />
                  <Input id="newlocation-input"
                    type="text"
                    name="Lotto Location Address"
                    placeholder="Location Address"
                    // label="Lotto Address"
                    // id="outlined-margin-normal"
                    // defaultValue="Location Address"
                    // margin="normal"
                    // variant="outlined"
                    onChange={(e) =>
                      this.setState({ lottoAddress: e.target.value })
                    }
                    value={this.state.lottoAddress}
                  />
                  <button type="submit">Add New Location!</button>
                </div>
              </form>
          </Container>
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default withStyles(styles)(Destinations);