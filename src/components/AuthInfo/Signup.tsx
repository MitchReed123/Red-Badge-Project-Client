import React, { Props } from "react";
import { Form, FormGroup, Input } from "reactstrap";
type valueType = {
  username: string;
  setUsername: any;
  password: string;
  setPassword: string;
};

type acceptedProps = {
  token: any;
  updateUsername: any;
  updateMessage: any;
  updateUserRole: any;
};

export default class Signup extends React.Component<acceptedProps, valueType> {
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
    fetch("http://localhost:3000/user/signup", {
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
        this.props.updateUsername(data.user.username);
        this.props.updateMessage(data.message);
        this.props.updateUserRole(data.user.userRole);
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <h1 className="auth-header">Signup</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input className="auth-input"
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Input className="auth-input"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </FormGroup>
          <button type="submit">Signup</button>
        </Form>
      </div>
    );
  }
}
