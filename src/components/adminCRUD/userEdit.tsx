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
import APIURL from "../../helpers/environment";
import * as bcrypt from "bcryptjs";
import "./userEdit.css";

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
    fetch(`${APIURL}/user/${this.props.setUpdateUser.id}`, {
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
      console.log(res);
      this.props.fetchUsers();
      this.props.updateOff();
    });
  };

  render() {
    return (
      <Modal id="useredit-modal" isOpen={true}>
        <ModalHeader id="useredit-edit-header">Edit a User</ModalHeader>
        <ModalBody id="useredit-modal-body">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="username" id="useredit-text">
                Edit Username
              </Label>

              <Input id="useredit-input"
                name="username"
                required
                value={this.state.editUsername}
                title="required field"
                onChange={(e) =>
                  this.setState({ editUsername: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password" id="useredit-text">
                Edit PassWord
              </Label>

              <Input id="useredit-input"
                name="password"
                placeholder="Enter New Password"
                // value={this.state.editPassword}
                value={this.state.editPassword}
                required
                title="Required Field"
                // value={bcrypt.hashSync(this.state.editPassword, salt)}
                // pass = bcrypt.hashSync(this.loginForm.value.password, salt);
                onChange={(e) =>
                  this.setState({ editPassword: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="userRole" id="useredit-text">
                Edit User Role
              </Label>

              <Input id="useredit-input"
                name="userRole"
                value={this.state.userRole}
                onChange={(e) => this.setState({ userRole: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName" id="useredit-text">
                Edit First Name
              </Label>

              <Input id="useredit-input"
                name="firstName"
                value={this.state.userFirstName}
                onChange={(e) =>
                  this.setState({ userFirstName: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName" id="useredit-text">
                Edit Last Name
              </Label>

              <Input id="useredit-input"
                name="lastName"
                value={this.state.userLastName}
                onChange={(e) =>
                  this.setState({ userLastName: e.target.value })
                }
              />
            </FormGroup>

            <button id="useredit-button" type="submit">Update User</button>

          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
