import React from "react";
import * as bcrypt from "bcryptjs";
import { Modal, Button, Input, Form, Col, Row } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { withStyles } from "@material-ui/core/styles";
import "./editInfo.css";
import APIURL from "../../helpers/environment";

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

//STYLING
const styles = {
  welcome: {
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "70px",
    marginTop: "20px",
    marginBottom: "40px",
    marginLeft: "35%",
    marginRight: "35%",
    color: "#f2f2f2",
    alignContent: "center",
  },

  form: {
      backgroundColor: "#4536b3",
      fontFamily: "MOMCAKE-BOLD",
      height: "auto",
      width: "600px",
      // marginTop: "10px",
      marginBottom: "40px",
      marginLeft: "35%",
      marginRight: "35%",
      // color: "#f2f2f2",
      // alignContent: "center",
    },

    updateButton: {
      // marginLeft: "600px",
      backgroundColor: "#fa5a57",
      fontFamily: "MOMCAKE-BOLD",
      border: "2px solid #fa5a57",
      borderRadius: "2px",
      height: "70px",
      width: "250px",
      color: "whitesmoke",
      boxShadow: "10px 5px 7px 0px rgba(184, 182, 182, 0.75)",
      cursor: "pointer",
      fontSize: "20px",
    }, 

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

class EditInfo extends React.Component<acceptedProps, valueTypes> {
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
    fetch(`${APIURL}/user/${this.props.setUpdateUser.id}`, {
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
      <Row>
        <div style={styles.welcome}>
          <h1>{this.Welcoming()}</h1>
        </div>
      </Row>
      <Row>
        <Form
          style={styles.form}
          // {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit} //this.handlesubmit
          onFinishFailed={this.onFinishFailed}
          // size="middle"
        >

          {/* <Col > */}
            {/* <Row justify="center"> */}
            <h1 id="form-header">Enter new username: </h1>
              <Form.Item 
                // style={{
                //   width: "250px",
                //   alignContent: "center",
                //   alignItems: "center",
                // }}
                // label="username"
                // name="username"
                // help="Please enter a username"
                initialValue={this.props.setUpdateUser.username}
                rules={[{ required: true, message: "please input a username" }]}
              >
                <Input id="input"
                  onChange={(e) =>
                    this.setState({ editUsername: e.target.value })
                  }
                />
              </Form.Item>
            {/* </Row> */}
          {/* </Col>
          <Col id="col-two" > */}
            {/* <Row justify="center"> */}
            <h1 id="form-header">Enter new password: </h1>
              <Form.Item
                // label="password"
                // style={{ width: "250px" }}
                // name="password"
                // initialValue={this.props.setUpdateUser.password}
                // help="Please enter a password"
                rules={[{ required: true, message: "Please enter a password" }]}
              >
                <Input.Password id="input"
                  onChange={(e) =>
                    this.setState({ editPassword: e.target.value })
                  }
                />
                {/* <Button  htmlType="submit" style={styles.updateButton}>
                  Update
                </Button> */}
              </Form.Item>
            {/* </Row> */}
          <Button  htmlType="submit" style={styles.updateButton}>
            Update
          </Button>
          {/* </Col> */}

        </Form>
      </Row>
    </div>
  );

  Welcoming() {
    return localStorage.getItem("message") === null ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Sign up or Login to see your Ratings!
      </h1>
    ) : localStorage.getItem("message") === "user succesfully logged in" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Update Your Username/Password {localStorage.getItem("username")}!
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome, {localStorage.getItem("username")}
      </h1>
    ) : (
      "null"
    );
  }

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

export default withStyles(styles)(EditInfo);
