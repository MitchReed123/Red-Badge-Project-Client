import React from "react";
import {Container, Row, Col} from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Route, Link, Switch } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Apps from "./AssignedFeature/mitch";
import Bored from "./AssignedFeature/brittany";
import Taco from "./AssignedFeature/mizue";
// import {
//   FormGroup,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Input,
//   Label,
//   Form,
// } from "reactstrap";
// import EditInfo from "./editInfo";
// import App from "../../App";
// import { useHistory } from "react-router-dom";
// import { isNumber } from "util";
// import * as bcrypt from "bcryptjs";
// import EditUser from "./editInfo";
// const salt = bcrypt.genSaltSync(10);

type acceptedProps = {
  clickLogout: any;
  protectedViews: any;
  token: any;
  protectedViewsTwo: any;
  protectViewsThree: any;
  updateUsername: any;
  protectViewsFour: any;
};

type valueTypes = {
  key: string;
  nextDraw1: string;
  lotto2: string;
  setOpen: boolean;
};

// MATERIAL STYLES 
const styles = {
  root: {
    // backgroundColor: "#231874",
    background: "url(./assests/background_blue.png)",
    padding: "10px",
    fontFamily: "MOMCAKE-BOLD"
  },

  logoutButton: {
    marginLeft: "600px",
    // backgroundColor: "#fa5a57",
    // fontFamily: "MOMCAKE-BOLD",
    // marginTop: "1em",
    // border: "2px solid #fa5a57",
    // borderRadius: "2px",
    // height: "70px",
    // width: "250px",
    // color: "whitesmoke",
    // boxShadow: "10px 5px 7px 0px rgba(184, 182, 182, 0.75)",
    // cursor: "pointer",
    // fontSize: "20px",
  }, 

  menuButton: {
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    marginLeft: "60px"
  },

  typography: {
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "20px"
  }

};


class Sitebar extends React.Component<acceptedProps> {

// export default class Sitebar extends React.Component<
//   acceptedProps,
//   valueTypes
// > {
  constructor(props: acceptedProps) {
    super(props);

    this.state = {
      key: "xtrxaWwnzMXjbuU2SD",
      nextDraw1: "",
      lotto2: "",
      setOpen: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ setOpen: true });
  };

  handleClose = () => {
    this.setState({ setOpen: false });
  };

  viewPages() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <Button style={{ color: "black" }}>
        <Link to="/">Home</Link>
      </Button>
    );
  }

  viewPages2() {
    return localStorage.getItem("userRole") === "Admin" ? (
      <Button style={{ color: "black" }}>
        <Link to="/Admin">Admin</Link>
      </Button>
    ) : (
      ""
    );
  }

  viewPages3() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <Button style={{ color: "black" }}>
        <Link to="/Destination">Destinations</Link>
      </Button>
    );
  }

  viewPages4() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <Button>
        <Link to="/UpdateInfo">Edit Info</Link>
      </Button>
    );
  }
  testing() {
    return localStorage.getItem("userRole") === "Admin" ? (
      <Menu.Item key="5">{this.viewPages2()}</Menu.Item>
    ) : (
      ""
    );
  }

  // DROPDOWN MENU
  menu = (
    <Menu>
      <Menu.Item key="0">
        <Apps />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Bored />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Taco />
      </Menu.Item>
      <Menu.Divider />
      <h3>APIS</h3>
      <Menu.Divider />
      <Menu.Item key="3">{this.viewPages()}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">{this.viewPages3()}</Menu.Item>
      <Menu.Divider />
      {this.testing()}
      <Menu.Divider />
      <Menu.Item key="6">{this.viewPages4()}</Menu.Item>
    </Menu>
  );

  logoutBtn() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      // STYLING HERE
      <AppBar position="static" style={styles.root}>
        <Toolbar className="classes.color">
          <Typography variant="h6" id="navTitle" style={styles.typography}>
          <img width="100px" src={require('../../assests/DLlogo3.png')} alt="logo" />
          </Typography>
          {/* {this.viewPages()}
          {this.viewPages3()}
          {this.viewPages2()} */}
          {/* {this.viewPages4()} */}
          <Dropdown overlay={this.menu} trigger={["click"]}>
            <Button style={styles.menuButton}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              // style={{ color: "lightblue" }}
            >
              Menu <DownOutlined />
            </Button>
          </Dropdown>

          <button id="logout-button" style={styles.logoutButton} onClick={this.props.clickLogout}>Logout</button>
          {/* <Button> {this.viewPages4()}TESTING </Button> */}
        </Toolbar>
      </AppBar>
    );
  }

  componentWillMount() {}

  componentDidMount() {
    // this.fetchUsers();
    // this.userMapper();
  }

  render() {

    return (
      // <div >
      //   <AppBar style={styles.root} position="static">
      //     <Toolbar >
      //       {/* <Col md="6">  */}
      //         <Typography variant="h6" style={styles.typography} >
      //           <img width="70px" src={require('../../assests/DLlogo3.png')} alt="logo" />
      //         </Typography>
      //        {/* </Col>  */}
      //        {/* <Col style={styles.button} md="6">  */}
      //         <button style={styles.button} onClick={this.props.clickLogout}>Logout</button>
      //       {/* </Col> */}
      //     </Toolbar>
      //     {/* {this.state.lottojackpot1} */}
      //   </AppBar>
      <div className="classes.root">
        {this.logoutBtn()}
        <Switch>
          <Route exact path="/">
            {this.props.protectedViews()}
          </Route>
          <Route exact path="/Destination">
            {this.props.protectedViewsTwo()}
          </Route>
          <Route exact path="/Admin">
            {this.props.protectViewsThree()}
          </Route>
          <Route exact path="/UpdateInfo">
            {this.props.protectViewsFour()}
          </Route>
        </Switch>
        {/* {this.state.setUpdateActive ? (
          <EditInfo
            userMapper={this.userMapper}
            updateOff={this.updateOff}
            fetchUsers={this.fetchUsers}
            setUpdateUser={this.state.setUpdateUser}
          />
        ) : (
          <></>
        )} */}
      </div>
    );
  }
}

export default withStyles(styles)(Sitebar);