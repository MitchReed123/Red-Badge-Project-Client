// where we will call the Login/Signup componenets
import React from "react";
import "./Auth.css";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Container, Row, Col, Form} from 'reactstrap';

import Signup from "./Signup";
import Login from "./Login";


const styles = {
  root: {
    padding: "40px",
    marginTop: "100px",
    marginBottom: "40px",
    fontFamily: "MOMCAKE-BOLD"
  },

  toggle: {
    backgroundColor: "rgba(69, 54, 179, 0.7)",
    // width: "30%",
    // marginLeft: "5px"
  },

  ticket: {
    // backgroundColor: "#f2f2f2",
    width: "30%",
  },

  img: {
    border: "10px solid rgba(69, 54, 179, 0.8)"
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
          
          <Col sm="5" md="6"  style={styles.ticket}>
          <p className="title-the">The</p>
          <p className="title-daily">Daily</p>
          <p className="title-lotto">Lotto</p>
          <div> 
            <img id="lotto-info" width="400px" style={styles.img} src={require('../../assests/lotto3.png')} alt="The Daily Lotto info" />
          </div>
          </Col>
          <Col sm="5" md="6" id="col-two" style={styles.toggle}>
            <Form >
              <div id="switch-button">{this.switcher()}</div>
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
