// both tables will come fron the User table and the Destination Table. Admin Destination/User will have update/delete power on both tables
//normal imports
import React from "react";
import { Button, Row, Col, Container, Label, Form, Input } from "reactstrap";

import UserEdit from "./userEdit";
import DestinationEdit from "./destinationEdit";
import "./adminIndex.css";


//MATERIAL IMPORTS
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import Tooltip from '@material-ui/core/Tooltip';



type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueTypes = {
  userTable: [];
  destinationTable: [];
  setUpdateUser: {};
  setUpdateLoco: {};
  username: string;
  password: string;
  setUpdateActive: boolean;
  SetUpdateActiveLoco: boolean;
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
  
  userRoot: {
    width: "100%",
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    border: "10px solid rgba(69, 54, 179, 0.8)"
  },
  
  userContainer: {
    maxHeight: "500px",
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px"
  },

  locationRoot: {
    // width: "1000px",
    // backgroundColor: "#f2f2f2",
    // border: "10px solid #4536b3",
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    width: "80%",
    height: "70%",
    marginLeft: "5%",
    marginRight: "5%",
    border: "10px solid #4536b3"

  },

  locationContainer: {
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

  newUserForm: {
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    width: "60%",
    height: "400px",
    // marginRight: "20px",
    marginLeft: "5%",
    marginTop: "5%"
  },

  toolTip: {
    backgroundColor: "white",
    color: 'rgba(0, 0, 0, 0.87)',
    // boxShadow: "shadows[1]",
    fontSize: "11"
  }

};

// MATERIAL UI FIXED TABLES

// USER TABLE
interface userColumn {
  id: 'username' | 'password' | 'firstName' | 'lastName' | 'userRole' | 'update' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const usercolumns: userColumn[] = [
  { id: 'username', label: 'Username', minWidth: 150 },
  // { id: 'password', label: 'Password', minWidth: 100 },
  { id: 'firstName', label: 'First Name', minWidth: 150 },
  { id: 'lastName', label: 'Last Name', minWidth: 150 },
  { id: 'userRole', label: 'User Role', minWidth: 150 },
  { id: 'update', label: 'Update', minWidth: 150 },
  { id: 'delete', label: 'Delete', minWidth: 150 },

];

// LOCATION TABLE
interface locationColumn {
  id: 'lottoLocation' | 'lottoAddress' | 'update' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const locationcolumns: locationColumn[] = [
  { id: 'lottoLocation', label: 'Lottery Location', minWidth: 150 },
  { id: 'lottoAddress', label: 'Lottery Address', minWidth: 150 },
  { id: 'update', label: 'Update', minWidth: 150 },
  { id: 'delete', label: 'Delete', minWidth: 150 },

];


// ADMIN COMPONENT

class Admin extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      userTable: [],
      destinationTable: [],
      username: "",
      password: "",
      setUpdateUser: {},
      setUpdateLoco: {},
      setUpdateActive: false,
      SetUpdateActiveLoco: false,
    };
  }

  //ALL THE STUFF FOR UPDATING
  editUpdateUser = (users: any) => {
    console.log(users);
    this.setState({ setUpdateUser: users });
  };

  editUpdateLocation = (locos: any) => {
    console.log(locos);
    this.setState({ setUpdateLoco: locos });
  };

  updateOn = () => {
    this.setState({ setUpdateActive: true });
  };

  updateOnDest = () => {
    this.setState({ SetUpdateActiveLoco: true });
  };

  updateOff = () => {
    this.setState({ setUpdateActive: false });
  };

  updateOffDest = () => {
    this.setState({ SetUpdateActiveLoco: false });
  };

  

  //ADDS DELETE BUTTON TO USER TABLE
  deleteUser = (user: any) => {
    console.log("id", user.id);

    fetch(`http://localhost:3000/user/${user.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then(() => this.fetchUsers());
  };
  //ADD DELETE BUTTON TO DESTINATION TABLE
  deleteLoco = (loco: any) => {
    console.log("id", loco.id);

    fetch(`http://localhost:3000/destination/${loco.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then(() => this.fetchDestinations());
  };
  // FETCHING ALL USER TO DISPLAY ON TABLE
  // THIS SHOULD HELP YOU MIZUE
  fetchUsers = () => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log("Pure user data", userData);
        this.setState({
          userTable: userData.user,
        });
        console.log("State Variable Data", this.state.userTable);
      });
  };

  //getting destination information
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
  //handling the submit for the create a user
  handleSubmit = (event: any) => {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
    fetch("http://localhost:3000/user/AdminSignUp", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // this.props.token(data.sessionToken);
        console.log(data);
        // this.props.updateUsername(data.user.username);
        // this.props.updateMessage(data.message);
        // this.props.updateUserRole(data.user.userRole);
        this.setState({ username: "" });
        this.setState({ password: "" });
        this.fetchUsers();
      });
  };


  // USER MAPPER/TABLE

  // can i do a turnary here where it checks for your id, localStorage.getItem("username") === this.state.editUsername ? ()
  userWrapper = () => {
    return this.state.userTable.map((user: any, index) => {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          {/* <td>{user.password}</td> */}
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.userRole}</td>
          <td>
          <Tooltip id="tool-tip" title="Update User Info" arrow placement="bottom" style={styles.toolTip}> 
            <EditSharpIcon fontSize="large"
              onClick={() => {
                this.editUpdateUser(user);
                this.updateOn();
              }}
            />
          </Tooltip>
          </td>
          <td>
          <Tooltip id="tool-tip" title="Delete User" arrow placement="bottom" style={styles.toolTip}>
            <DeleteIcon fontSize="large" 
              onClick={() => {
                this.deleteUser(user);
              }} 
            />
          </Tooltip>    
          </td>
        </tr>
      );
    });
  };

// LOCATION MAPPER/TABLE

  destinationWrapper = () => {
    return this.state.destinationTable.map((location: any, index) => {
      return (
        <tr key={index}>
          <td>{location.lottoLocation}</td>
          <td>{location.lottoAddress}</td>
          <td>
          <Tooltip id="tool-tip" title="Update Location Info" arrow placement="bottom">
            <EditSharpIcon fontSize="large"
              onClick={() => {
                this.editUpdateLocation(location);
                this.updateOnDest();
              }}
            />
          </Tooltip>    
          </td>
          <td>
          <Tooltip id="tool-tip" title="Delete Location" arrow placement="bottom">
            <DeleteIcon fontSize="large"
              onClick={() => {
                this.deleteLoco(location);
              }}
            />
          </Tooltip>  
          </td>
        </tr>
      );
    });
  };

  componentWillMount() {
    console.log("Im about to mount");
  }

  componentDidMount() {
    console.log("component mounted");
    this.fetchUsers();
    this.userWrapper();
    this.fetchDestinations();
    this.destinationWrapper();
    console.log(this.userWrapper());
    // return userMapper();
    // this.DestinationInfoFetch();
  }
  //This is for the customer username information that we have in localstorage
  Welcoming() {
    return localStorage.getItem("message") === null ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Sign Up or Login to see your Lottos
      </h1>
    ) : localStorage.getItem("message") === "user succesfully logged in" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        {localStorage.getItem("username")}'s Admin Panel
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        {localStorage.getItem("username")}'s Admin Panel
      </h1>
    ) : (
      "null"
    );
  }

  //RENDER

  render() {
    return (
      <div>
        <Row lg="12">
          <div style={styles.welcome}>
            <h1>{this.Welcoming()}</h1>
          </div>
        </Row>

        {/* {this.userInfoFetch()}

        {this.DestinationInfoFetch()} */}
        {/* USER TABLE */}
        <Row >
        <Col md="8" id="col-one" style={styles.userRoot}>
            <h1 className="table-header">User Info</h1>
            <Paper >
            <TableContainer style={styles.userContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {usercolumns.map((column) => (
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
                <TableBody >
                  {this.userWrapper()}                 
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          </Col>

          {/* ADD NEW USER FORM */}
          <Col md="3" id="col-two" style={styles.newUserForm}>
          {/* <h1 id="signup-newuser">Sign up a New User</h1> */}
          <Form noValidate autoComplete="off" onSubmit={this.handleSubmit} >
            <div>
              <h1 id="add-newuser">Add a New User</h1>
              <Input id="newuser-input"
                // id="outline-margin-normal"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
              />
              <Input id="newuser-input"
                type="text"
                name="username"
                placeholder="Password"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
              <button type="submit">Add New User</button>
            </div>
          </Form>
          </Col>
        </Row>
        
        <Row md="9" >
          {/* DESTINATION TABLE */}
        <Col style={styles.locationRoot}>
        <h1 className="table-header">Location Info</h1>
        <Paper >
            <TableContainer style={styles.locationContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {locationcolumns.map((column) => (
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
                <TableBody >
                  {this.destinationWrapper()}
                 
                </TableBody>
              </Table>
            </TableContainer>
            
          </Paper>
        </Col>
         
        </Row>
        {this.state.setUpdateActive ? (
          <UserEdit
            updateOff={this.updateOff}
            token={this.props.token}
            fetchUsers={this.fetchUsers}
            setUpdateUser={this.state.setUpdateUser}
          />
        ) : (
          <></>
        )}
        {this.state.SetUpdateActiveLoco ? (
          <DestinationEdit
            updateOff={this.updateOffDest}
            token={this.props.token}
            fetchDestination={this.fetchDestinations}
            setUpdateLoco={this.state.setUpdateLoco}
          />
        ) : (
          <></>
        )}

      </div>
    );
  }
}

export default withStyles(styles)(Admin);