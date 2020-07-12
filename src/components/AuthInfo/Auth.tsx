// where we will call the Login/Signup componenets
import React from "react";
import "./Auth.css";
import { withStyles } from "@material-ui/core/styles";
import {Container, Row, Col, Form} from 'reactstrap';

import Signup from "./Signup";
import Login from "./Login";


const styles = {
  root: {
    padding: "40px",
    marginTop: "40px",
    marginBottom: "40px",
    fontFamily: "MOMCAKE-BOLD"
  },

  toggle: {
    backgroundColor: "rgba(69, 54, 179, 0.7)",
    width: "30%",
    // marginLeft: "5px"
  },

  card: {
    // backgroundColor: "#f2f2f2",
    width: "30%",
  },

  button: {
    marginLeft: "70%"
  }, 

  typography: {
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "20px"
  }

};



type acceptedProps = {
  token: string | any;
  updateUsername: string | any;
  updateMessage: string | any;
  updateUserRole: string | any;
};

type valueTypes = {
  login: boolean;
  setLogin: boolean;
  username: string;
  password: string;
};

class Auth extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      login: true,
      setLogin: false,
      username: "",
      password: "",
    };
  }
  switcher = () => {
    return this.state.login ? (
      <Signup
        token={this.props.token}
        updateUsername={this.props.updateUsername}
        updateMessage={this.props.updateMessage}
        updateUserRole={this.props.updateUserRole}
      />
    ) : (
      <Login
        token={this.props.token}
        updateUsername={this.props.updateUsername}
        updateMessage={this.props.updateMessage}
        updateUserRole={this.props.updateUserRole}
      />
    );
  };

  loginToggle = (event: any) => {
    event.preventDefault();

    this.setState({ login: !this.state.login });

    this.setState({ username: "" });
    this.setState({ password: "" });
  };

  render() {
    return (
     
      <div style={styles.root}>
        <Row>
          {/* <p className="title-THE">The</p>
          <p className="title-D">D</p><p className="title-daily">aily</p>
          <p className="title-L">L</p><p className="title-lotto">otto</p> */}
          {/* <p className="title">The</p>
          <p className="title">Daily</p>
          <p className="title">Lotto</p> */}
        </Row>
        {/* <Row>
          <p className="title-D">D</p><p className="title-daily">aily</p>
        </Row>
        <Row>
          <p className="title-L">L</p><p className="title-lotto">otto</p>
        </Row> */}
        <Row>
          
          <Col md="6" style={styles.card}>
          <p className="title-the">The</p>
          <p className="title-daily">Daily</p>
          <p className="title-lotto">Lotto</p>
            {/* <p className="title-THE">The</p>
            <p className="title-daily">Daily</p>
            <p className="title-lotto">Lotto</p> */}
            <img id="lotto-info" width="400px" src={require('../../assests/lotto3.png')} alt="The Daily Lotto info" />
          </Col>
          <Col md="6" style={styles.toggle}>
            <Form >
              <h1>{this.switcher()}</h1>
              {/* <button id="toggle-button" onClick={this.loginToggle}>Login or Signup</button> */}
              <button id="toggle-button" onClick={this.loginToggle}>Already have an account? Login here!</button>
            </Form>
          </Col>
        </Row>
        
      </div>
      
    );
  }
}

export default withStyles(styles)(Auth);

/* <h1>Auth Page</h1>
        {this.props.token}
        {this.props.updateUsername}
        {this.props.updateMessage}
        {this.props.updateUserRole} */
