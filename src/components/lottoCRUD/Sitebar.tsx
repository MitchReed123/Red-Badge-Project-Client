import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
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

export default class Sitebar extends React.Component<
  acceptedProps,
  valueTypes
> {
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
      <Menu.Item key="5">{this.viewPages2()}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">{this.viewPages4()}</Menu.Item>
    </Menu>
  );

  logoutBtn() {
    return localStorage.getItem("token") === null ? (
      ""
    ) : (
      <AppBar position="static">
        <Toolbar className="classes.color">
          <Typography variant="h6" id="navTitle" className="classes.title">
            Lotto App
          </Typography>
          {/* {this.viewPages()}
          {this.viewPages3()}
          {this.viewPages2()} */}
          {/* {this.viewPages4()} */}
          <Dropdown overlay={this.menu} trigger={["click"]}>
            <Button
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: "lightblue" }}
            >
              Click me <DownOutlined />
            </Button>
          </Dropdown>

          <Button onClick={this.props.clickLogout}>Logout</Button>
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
