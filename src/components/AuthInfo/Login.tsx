import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

type valueType = {
  username: string;
  setUsername: string;
  password: string;
  setPassword: string;
};

export default class Login extends React.Component<acceptedProps, valueType> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      setUsername: "",
      password: "",
      setPassword: "",
    };
  }

  handleSubmit = (event: any) => {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.token(data.sessionToken);
        this.props.updateUsername(data.user.username);
        this.props.updateMessage(data.message);
        this.props.updateUserRole(data.user.userRole);
        console.log(data.username, data.userRole);
      });
  };
  render() {
    return (
      <div>
        <h1>Login Page </h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </FormGroup>
          <button type="submit">login</button>
        </Form>
      </div>
    );
  }
}
