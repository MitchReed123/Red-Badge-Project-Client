import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

type acceptedProps = {
  clickLogout: any;
};

export default class Sitebar extends React.Component<acceptedProps> {
  constructor(props: acceptedProps) {
    super(props);
  }

  // history = useHistory();
  // classes = useStyles();

  // logoutBtn() {
  //   var logOut = () => {
  //     this.props.clickLogout();
  //   };

  //   return localStorage.getItem("token") === null ? (
  //     ""
  //   ) : (
  //     <Button onClick={logOut} id="navLog">
  //       logout
  //     </Button>
  //   );
  // }

  render() {
    return (
      <div className="classes.root">
        <AppBar position="static">
          <Toolbar className="classes.color">
            <Typography variant="h6" id="navTitle" className="classes.title">
              Lotto App
            </Typography>
            <button onClick={this.props.clickLogout}>Logout</button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
