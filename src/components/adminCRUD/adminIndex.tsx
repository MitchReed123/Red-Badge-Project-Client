// both tables will come fron the User table and the Destination Table. Admin Destination/User will have update/delete power on both tables
//normal imports
import React from "react";
import destinationTable from "../destinationsCRUD/destinationTable";
import DestinationUpdate from "../destinationsCRUD/destinationUpdate";
import DestinationCreate from "../destinationsCRUD/destinationCreate";

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
//import { userInfo } from "os";

type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueTypes = {
  userTable: [];
  destinationTable: string[];
  username: string;
  password: string;
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
    };
  }
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
        console.log("Pure user data", userData.user[0].username);
        this.setState({
          userTable: userData.user,
        });
        console.log("State Variable Data", this.state.userTable);
      });
  };

  //getting destination information
  DestinationInfoFetch = () => {
    fetch("http://localhost:3000/destination/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((destinationInfo) => {
        console.log("destinations", destinationInfo);
        this.setState({
          destinationTable: destinationInfo,
        });
        console.log("Destination state variable", this.state.destinationTable);
      });
  };
  //handling the submit for the create a user
  handleSubmit = (event: any) => {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
    fetch(`http://localhost/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.token(data.sessionToken);
        console.log(data);
        this.props.updateUsername(data.user.username);
        this.props.updateMessage(data.message);
        this.props.updateUserRole(data.user.userRole);
      });
  };

  userWrapper = () => {
    return this.state.userTable.map((user: any, index) => {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.password}</td>
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

  // destinationWrapper = () => {
  //   return this.state.destinationTable.map((destination: any, index) => {
  //     return (
  //       <tr key={index}>
  //         <td>{destination.lottoLocation}</td>
  //         <td>{destination.lottoAddress}</td>
  //       </tr>
  //     );
  //   });
  // };

  componentWillMount() {
    console.log("Im about to mount");
  }

  componentDidMount() {
    console.log("component mounted");
    this.fetchUsers();
    this.userWrapper();
    // this.DestinationInfoFetch();
    // this.destinationWrapper();
    console.log(this.userWrapper());
    // return userMapper();
    // this.DestinationInfoFetch();
  }

  render() {
    return (
      <div>
        <h1>Testing</h1>

        {/* {this.userInfoFetch()}

        {this.DestinationInfoFetch()} */}

        <h1>Sign up a new User</h1>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              error
              id="outline-error"
              label="Error"
              defaultValue="Username"
              variant="outlined"
            />
            <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Password"
              helperText="Incorrect Entry"
              variant="outlined"
            />
          </div>
        </form>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Passwords</th>
            </tr>
          </thead>
          <tbody>{this.fetchUsers}</tbody>
          {/* This will also be apart of what you need to do */}
          <tbody>{this.userWrapper()}</tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Address</th>
            </tr>
          </thead>
          {/* <tbody>{this.destinationWrapper()}</tbody> */}
        </Table>
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
