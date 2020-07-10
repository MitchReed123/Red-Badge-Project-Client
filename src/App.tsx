import React from "react";
import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import { Button } from "antd";
import Admin from "./components/adminCRUD/adminIndex";
import LottoIndex from "./components/lottoCRUD/lottoIndex";
import DestinationIndex from "./components/destinationsCRUD/destinationIndex";
// import Sidebar from "./components/router-dom/Sidebar";
import Auth from "./components/AuthInfo/Auth";
// import Lotto from "./components/lottoCRUD/lottoIndex";
import Sitebar from "./components/lottoCRUD/Sitebar";
import "bootstrap/dist/css/bootstrap.min.css";
// import Testing from "./components/destinationsCRUD/testSearch";
// import UserEdit from ""
import EditUser from "./components/lottoCRUD/editInfo";
// import ResetPass from "../src/components/router-dom/updatePassword";

type valueTypes = {
  setUsername: string | any;
  setToken: string | any;
  setMessage: string | any;
  setUserRole: string | any;
  setUpdateUser: {};
  userTable: [];
  setUpdateActive: boolean;
};

export default class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {
      setUsername: "",
      setToken: "",
      setMessage: "",
      setUserRole: "",
      setUpdateUser: {},
      userTable: [],
      setUpdateActive: false,
    };
  }

  componentWillMount() {
    console.log("testing this ");
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ setToken: localStorage.getItem("token") });
    }

    if (localStorage.getItem("username")) {
      this.setState({ setUsername: localStorage.getItem("username") });
    }

    if (localStorage.getItem("message")) {
      this.setState({ setMessage: localStorage.getItem("message") });
    }

    if (localStorage.getItem("userRole")) {
      this.setState({ setUserRole: localStorage.getItem("userRole") });
    }
  }

  userMapper = () => {
    return this.state.userTable.map((user: any, index) => {
      return (
        <>
          <h1>{user.username}</h1>
          <h1>{user.password}</h1>
          <Button
            onClick={() => {
              this.editUpdateUser(user);
              this.updateOn();
            }}
          >
            Update Info!
          </Button>
        </>
      );
    });
  };

  fetchUsers = () => {
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log("Pure user data", userData);
        this.setState({
          userTable: userData.user,
        });
        console.log("State Variable Data", this.state.userTable);
      });
  };

  editUpdateUser = (users: any) => {
    console.log(users);
    this.setState({ setUpdateUser: users });
  };

  updateOff = () => {
    this.setState({ setUpdateActive: false });
  };

  updateOn = () => {
    this.setState({ setUpdateActive: true });
  };

  updateUsername = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    this.setState({ setUsername: newUsername });
    console.log(newUsername);
  };

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ setToken: newToken });
    console.log(newToken);
  };

  updateMessage = (newMessage: string) => {
    localStorage.setItem("message", newMessage);
    this.setState({ setMessage: newMessage });
  };

  updateUserRole = (newUserRole: string) => {
    localStorage.setItem("userRole", newUserRole);
    this.setState({ setUserRole: newUserRole });
    console.log(this.state.setUserRole);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ setToken: "" });
    this.setState({ setMessage: "" });
    this.setState({ setUsername: "" });
    this.setState({ setUserRole: "" });
    sessionStorage.clear();
  };

  protectViewsOne = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <LottoIndex token={this.state.setToken} />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateMessage={this.updateMessage}
        updateUserRole={this.updateUserRole}
      />
    );
  };

  protectedViewsTwo = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <DestinationIndex
        token={this.state.setToken}
        updateUsername={this.updateUsername}
        updateMessage={this.updateMessage}
        updateUserRole={this.updateUserRole}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateMessage={this.updateMessage}
        updateUserRole={this.updateUserRole}
      />
    );
  };

  protectViewsThree = () => {
    return localStorage.getItem("userRole") === "Admin" ? (
      <Admin
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateMessage={this.updateMessage}
        updateUserRole={this.updateUserRole}
      />
    ) : (
      <LottoIndex token={this.state.setToken} />
    );
  };

  protectedViewsFour = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <EditUser
        updateOff={this.updateOff}
        token={this.updateToken}
        fetchUsers={this.fetchUsers}
        setUpdateUser={this.state.setUpdateUser}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateMessage={this.updateMessage}
        updateUserRole={this.updateUserRole}
      />
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Sitebar
            updateUsername={this.updateUsername}
            clickLogout={this.clearToken}
            protectedViews={this.protectViewsOne}
            token={this.state.setToken}
            protectedViewsTwo={this.protectedViewsTwo}
            protectViewsThree={this.protectViewsThree}
            protectViewsFour={this.protectedViewsFour}
            // protectViewsFour={this.protectedViewsFour}
          />
        </Router>
      </div>
    );
  }
}
