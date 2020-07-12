// both tables will come fron the User table and the Destination Table. Admin Destination/User will have update/delete power on both tables
//normal imports
import React from "react";
// import destinationTable from "../destinationsCRUD/destinationTable";
// import DestinationUpdate from "../destinationsCRUD/destinationUpdate";
// import DestinationCreate from "../destinationsCRUD/destinationCreate";
import UserEdit from "./userEdit";
import DestinationEdit from "./destinationEdit";
import "./adminIndex.css";


//Style imports
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from '@material-ui/core/TablePagination';

import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import Tooltip from '@material-ui/core/Tooltip';

import { Button, Row, Col, Container, Label, Form, Input } from "reactstrap";


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
  userRoot: {
    width: "1000px",
    backgroundColor: "#f2f2f2",
    // fontFamily: "MOMCAKE-BOLD",
    border: "10px solid #4536b3"
  },

  locationRoot: {
    width: "1000px",
    backgroundColor: "#f2f2f2",
    border: "10px solid #4536b3"
  },
  
  userContainer: {
    maxHeight: "500px",
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px"
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
    backgroundColor: "#4536b3",
    width: "50%",
    height: "300px",
    marginRight: "30%",
    marginLeft: "30%", 
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
  { id: 'lottoLocation', label: 'Lotto Location', minWidth: 150 },
  { id: 'lottoAddress', label: 'Lotto Address', minWidth: 150 },
  { id: 'update', label: 'Update', minWidth: 150 },
  { id: 'delete', label: 'Delete', minWidth: 150 },

];
// interface Data {
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
  
// }

// function createData(username: string, password: string, firstName: string, lastName: string): Data {
//   return { username, password, firstName, lastName };
// }

// const rows = [
//   createData('India', 'IN', 'tiger', 'please'),
//   createData('China', 'CN', 'tiger', 'tiger'),
//   createData('Italy', 'IT', 'tiger', 'tiger'),
//   createData('United States', 'US', 'tiger', 'tiger')
// ];


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

  // MATERIAL UI TABLE PAGINATION

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // handleChangePage = (event: unknown, newPage: number) => {
  //   this.setState({setPage(newPage)});
  // };

  // handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({setRowsPerPage(+event.target.value);
  //     setPage(0)});
  // };



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
          <Tooltip title="Delete User" >
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
          <Tooltip title="Update Location Info" arrow placement="bottom">
            <EditSharpIcon fontSize="large"
              onClick={() => {
                this.editUpdateLocation(location);
                this.updateOnDest();
              }}
            />
          </Tooltip>    
          </td>
          <td>
          <Tooltip title="Delete Location" >
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
        {/* <Row> */}
          <h1 id="welcome-message">{this.Welcoming()}</h1>
        {/* </Row> */}


        {/* {this.userInfoFetch()}

        {this.DestinationInfoFetch()} */}
        <Row>
          <Col>
            <h1 className="table-header">User Info</h1>
            {/* MATERIAL UI FIXED TABLE */}
            <Paper style={styles.userRoot}>
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
          </Col>
          <Col>
          {/* ADD NEW USER FORM   */}
          {/* <h1 id="signup-newuser">Sign up a New User</h1> */}
          <Form noValidate autoComplete="off" onSubmit={this.handleSubmit} style={styles.newUserForm}>
            <div>
              <h1 id="add-newuser">Add a New User</h1>
              <Input id="newuser-input"
                // id="outline-margin-normal"
                type="text"
                name="username"
                placeholder="Username"
                // label="Username"
                // defaultValue="Username"
                // variant="outlined"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
              />
              <Input id="newuser-input"
                type="text"
                name="username"
                placeholder="Password"
                // id="outlined-margin-normal"
                // label="Password"
                // defaultValue="Password"
                // variant="outlined"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
              <button type="submit">Add New User</button>
            </div>
          </Form>
          </Col>
        </Row>
        <Row>
        
        <Col>
        <h1 className="table-header">Location Info</h1>
        {/* DESTINATION TABLE */}
        <Paper style={styles.locationRoot}>
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
        </Col>
          {/* DESTINATION TABLE */}
          {/* <Container id="destination-table">
            <Row>
              <Col md="11">
                <Table>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Address</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{this.fetchUsers}</tbody>
                  This will also be apart of what you need to do
                  <tbody>{this.destinationWrapper()}</tbody>
                </Table>
              </Col>
            </Row>
          </Container> */}
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