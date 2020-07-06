// where we will call the Login/Signup componenets
import React from "react";
import "./Auth.css";
import { withStyles } from "@material-ui/core/styles";
import {Container, Row, Col, Form} from 'reactstrap';

import Signup from "./Signup";
import Login from "./Login";
// import LottoImage from '../../assests/lotto.png';

// Lotto = "../../assests/lotto.png";

const styles = {
  root: {
    padding: "10px",
    fontFamily: "MOMCAKE-BOLD"
  },

  toggle: {
    backgroundColor: "#0EB8D2",
    width: "50%"
  },

  card: {
    backgroundColor: "#0EB8D2",
    width: "50%",
    // LottoImage: `url(${LottoImage})`
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
          <Col md="6" style={styles.card}>
            <h1>The Daily Lotto</h1>
            {/* {this.Lotto = "../../assests/lotto.png"}
            <img src="lotto.png"/> */}
            <img width="400px" src={require('../../assests/lotto.png')} alt="logo" />
          </Col>
          <Col md="6" style={styles.toggle}>
            <Form>
              <h1>{this.switcher()}</h1>
              <button onClick={this.loginToggle}>Login or Signup</button>
            </Form>
          </Col>
        </Row>
      
        <Row>
          <h1>row</h1>
          <Row>

          <Col>
            <h1>column</h1>
          </Col>
          </Row>
          <Col>
            <h1>column</h1>
          </Col>
          <Col>
            <h1>column</h1>
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
