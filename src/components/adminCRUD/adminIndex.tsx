// both tables will come fron the User table and the Destination Table. Admin Destination/User will have update/delete power on both tables
//normal imports
import React from "react";
import destinationTable from "../destinationsCRUD/destinationTable";
import DestinationUpdate from "../destinationsCRUD/destinationUpdate";
import DestinationCreate from "../destinationsCRUD/destinationCreate";
import UserEdit from "./userEdit";
import DestinationEdit from "./destinationEdit";
//Style imports
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import { Table, Button, Row, Col, Container, Label } from "reactstrap";

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
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
// }));
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

export default class Admin extends React.Component<acceptedProps, valueTypes> {
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
    this.setState({ setUpdateActive: true });
  };

  updateOff = () => {
    this.setState({ setUpdateActive: false });
  };

  updateOffDest = () => {
    this.setState({ setUpdateActive: false });
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

  userWrapper = () => {
    return this.state.userTable.map((user: any, index) => {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.password}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.userRole}</td>
          <td>
            <Button
              onClick={() => {
                this.editUpdateUser(user);
                this.updateOn();
              }}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              onClick={() => {
                this.deleteUser(user);
              }}
            >
              delete
            </Button>
          </td>
        </tr>
      );
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
                this.updateOnDest();
              }}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              onClick={() => {
                this.deleteLoco(location);
              }}
            >
              delete
            </Button>
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

        {/* {this.userInfoFetch()}

        {this.DestinationInfoFetch()} */}

        <h1>Sign up a new User</h1>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div>
            <TextField
              id="outline-margin-normal"
              label="Username"
              defaultValue="Username"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
            <TextField
              id="outlined-margin-normal"
              label="Password"
              defaultValue="Password"
              variant="outlined"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </div>
          <button type="submit">New user</button>
        </form>
        <Container>
          <Row>
            <Col md="8">
              <Table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Passwords</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Role</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {/* <tbody>{this.fetchUsers}</tbody> */}
                {/* This will also be apart of what you need to do */}
                <tbody>{this.userWrapper()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <Container>
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
                {/* This will also be apart of what you need to do */}
                <tbody>{this.destinationWrapper()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
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
        {this.state.setUpdateActive ? (
          <DestinationEdit
            updateOff={this.updateOff}
            token={this.props.token}
            fetchDestination={this.fetchDestinations}
            setUpdateLoco={this.state.setUpdateLoco}
          />
        ) : (
          <></>
        )}

        {/* <TableContainer component={Paper} />
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
        </Table> */}
      </div>
    );
  }
}
