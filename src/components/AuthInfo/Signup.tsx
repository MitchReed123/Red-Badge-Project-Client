import React, { Props } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
type valueType = {
  username: string;
  setUsername: string | any;
  password: string;
  setPassword: string;
  firstNAme: string;
  lastName: string;
};

type acceptedProps = {
  token: string | any;
  updateUsername: string | any;
  updateMessage: string | any;
  updateUserRole: string | any;
};

export default class Signup extends React.Component<acceptedProps, valueType> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      setUsername: "",
      password: "",
      setPassword: "",
      firstNAme: "",
      lastName: "",
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
        firstName: this.state.firstNAme,
        lastName: this.state.lastName,
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
        <h1>Signup</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username" id="username">
              Username
            </Label>
            <br />
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
              type="text"
              name="username"
              placeholder="Username(Required)"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
              title="Must contain atleast one number and one uppercase and lowercase letter, and at least 4 or more characters"
              required
              style={{ textAlign: "center" }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" id="password">
              Password
            </Label>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              name="password"
              type="password"
              placeholder="Password(Required)"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="firstName" id="firstName">
              First Name
            </Label>
            <Input
              onChange={(e) => this.setState({ firstNAme: e.target.value })}
              value={this.state.firstNAme}
              name="firstName"
              type="text"
              placeholder="First Name"
              title="Enter just your first name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName" id="lastName">
              Last Name
            </Label>
            <Input
              onChange={(e) => this.setState({ lastName: e.target.value })}
              value={this.state.lastName}
              name="lastName"
              type="text"
              placeholder="Last Name"
              title="Enter just your last name"
            />
          </FormGroup>
          <button type="submit">Signup</button>
        </Form>
      </div>
    );
  }
}
