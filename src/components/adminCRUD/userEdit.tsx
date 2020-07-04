import React from "react";
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import * as bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

type acceptedProps = {
  updateOff: any;
  token: any;
  fetchUsers: any;
  setUpdateUser: any;
};

type valueTypes = {
  editUsername: string;
  editPassword: string;
  userRole: string;
  userFirstName: string;
  userLastName: string;
};

export default class userEdit extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      editUsername: this.props.setUpdateUser.username,
      editPassword: this.props.setUpdateUser.password,
      userRole: this.props.setUpdateUser.userRole,
      userFirstName: this.props.setUpdateUser.firstName,
      userLastName: this.props.setUpdateUser.lastName,
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:3000/user/${this.props.setUpdateUser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username: this.state.editUsername,
          // password: this.state.editPassword,
          password: bcrypt.hashSync(this.state.editPassword, salt),
          userRole: this.state.userRole,
          firstName: this.state.userFirstName,
          lastName: this.state.userLastName,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchUsers();
      this.props.updateOff();
    });
  };

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Edit a User</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="username" id="username">
                Edit Username
              </Label>
              <Input
                name="username"
                value={this.state.editUsername}
                onChange={(e) =>
                  this.setState({ editUsername: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password" id="password">
                Edit PassWord
              </Label>
              <Input
                name="password"
                value={this.state.editPassword}
                // value={bcrypt.hashSync(this.state.editPassword, salt)}
                // pass = bcrypt.hashSync(this.loginForm.value.password, salt);
                onChange={(e) =>
                  this.setState({ editPassword: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="userRole" id="userRole">
                Edit User Role
              </Label>
              <Input
                name="userRole"
                value={this.state.userRole}
                onChange={(e) => this.setState({ userRole: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName" id="firstName">
                Edit First Name
              </Label>
              <Input
                name="firstName"
                value={this.state.userFirstName}
                onChange={(e) =>
                  this.setState({ userFirstName: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName" id="lastName">
                Edit Last Name
              </Label>
              <Input
                name="lastName"
                value={this.state.userLastName}
                onChange={(e) =>
                  this.setState({ userLastName: e.target.value })
                }
              />
            </FormGroup>
            <Button type="submit">Update user</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
