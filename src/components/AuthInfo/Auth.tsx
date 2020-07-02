// where we will call the Login/Signup componenets
import React from "react";
import Signup from "./Signup";
import Login from "./Login";

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

export default class Auth extends React.Component<acceptedProps, valueTypes> {
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
      <div>
        {/* <h2>Testing</h2> */}
        <form>
          <h1>{this.switcher()}</h1>
          <button onClick={this.loginToggle}>Login/Signup</button>
        </form>
      </div>
    );
  }
}

/* <h1>Auth Page</h1>
        {this.props.token}
        {this.props.updateUsername}
        {this.props.updateMessage}
        {this.props.updateUserRole} */
