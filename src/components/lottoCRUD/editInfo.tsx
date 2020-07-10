import React from "react";
import * as bcrypt from "bcryptjs";
import {
  FormGroup,
  // Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  // Button,
} from "reactstrap";
import { Modal, Button } from "antd";
const salt = bcrypt.genSaltSync(10);
type acceptedProps = {
  updateOff: any;
  token: any;
  fetchUsers: any;
  setUpdateUser: any;
};

type valueTypes = {
  editUsername: string | any;
  editPassword: string | any;
  userRole: string | any;
  visible: boolean;
  handleThis: any;
};

export default class EditInfo extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      editUsername: this.props.setUpdateUser.username,
      editPassword: this.props.setUpdateUser.password,
      userRole: this.props.setUpdateUser.userRole,
      visible: true,
      handleThis: this.handleSubmit,
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:3000/user/${this.props.setUpdateUser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username: this.state.editUsername,
          password: this.state.editPassword,
          userRole: this.state.userRole,
        },
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    }).then((res) => {
      console.log("testing", res);
      this.props.fetchUsers();
      this.props.updateOff();
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
      handleThis: true,
    });
  };

  render() {
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open
        </Button> */}
        <Modal
          title="Testing"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>testing</p>
        </Modal>
      </div>
    );
  }
}
