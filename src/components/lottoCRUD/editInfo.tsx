import React from "react";
import * as bcrypt from "bcryptjs";
import { Modal, Button, Input, Form, Col, Row } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const salt = bcrypt.genSaltSync(10);

type acceptedProps = {
  updateOff: any;
  token: any;
  setUpdateUser: any;
  editUpdateUser: any;
};

type valueTypes = {
  editUsername: string;
  editPassword: string;
  userRole: string;
  userFirstName: string;
  userLastName: string;
  visible: boolean;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const tests = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
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
      userFirstName: this.props.setUpdateUser.firstName,
      userLastName: this.props.setUpdateUser.lastName,
      visible: true,
    };
  }

  handleSubmit = (event: any) => {
    fetch(`http://localhost:3000/user/${this.props.setUpdateUser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username: this.state.editUsername,
          // password: this.state.editPassword,
          password: bcrypt.hashSync(this.state.editPassword, salt),
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: this.props.token,
      }),
    }).then((res) => {
      console.log(res);
      this.setState({ visible: false });
      // this.props.fetchUsers();
      this.props.updateOff();
      //to reroute after submit i can do
      //this.props.protectedViews1();
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
    //if they hit cancel i could do a
    //this.protectViews1(); as well
    this.setState({
      visible: false,
    });
  };

  onFinish = (values: any) => {
    console.log("success", values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed: ", errorInfo);
  };

  body = (
    <div>
      <h4>Update Your Username/Password</h4>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.handleSubmit} //this.handlesubmit
        onFinishFailed={this.onFinishFailed}
        size="middle"
      >
        <Col span={24}>
          <Row justify="center">
            <Form.Item
              style={{
                width: "250px",
                alignContent: "center",
                alignItems: "center",
              }}
              label="username"
              name="username"
              help="Please enter a username"
              initialValue={this.props.setUpdateUser.username}
              rules={[{ required: true, message: "please input a username" }]}
            >
              <Input
                onChange={(e) =>
                  this.setState({ editUsername: e.target.value })
                }
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Form.Item
              label="password"
              style={{ width: "250px" }}
              name="password"
              // initialValue={this.props.setUpdateUser.password}
              help="Please enter a password"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password
                onChange={(e) =>
                  this.setState({ editPassword: e.target.value })
                }
              />
            </Form.Item>
          </Row>
        </Col>
        <Button type="primary" htmlType="submit">
          Testing
        </Button>
      </Form>
    </div>
  );

  render() {
    return (
      <div>
        {/* <Modal
          title="basic modal"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        > */}
        {this.body}
        {/* </Modal> */}
        {/* <Upload {...tests}>
          <Button>
            <UploadOutlined />
          </Button>
        </Upload> */}
      </div>
    );
  }
}
