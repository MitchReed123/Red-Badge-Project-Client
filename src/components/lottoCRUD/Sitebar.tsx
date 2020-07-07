import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import { isNumber } from "util";

type acceptedProps = {
  clickLogout: any;
};

type valueTypes = {
  key: string;
  // lottojackpot1: number;
  nextDraw1: string;
  lotto2: string;
};

export default class Sitebar extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      key: "xtrxaWwnzMXjbuU2SD",
      // lottojackpot1: 0,
      nextDraw1: "",
      lotto2: "",
    };
  }

  // componentDidMount() {
  //   return localStorage.getItem("token") === null
  //     ? ""
  //     : fetch(
  //         `https://cors-anywhere.herokuapp.com/https://www.magayo.com/api/jackpot.php?api_key=${this.state.key}&game=us_powerball`
  //       ).then((json) => {
  //         console.log("WORK PLEASE", json.url);
  //         // this.setState({
  //         //   lottojackpot1: json.url.jackpot,
  //         //   nextDraw1: json.url.next_draw,
  //         // });

  //         //           currency: "USD"
  //         // error: 0
  //         // jackpot: "69000000"
  //         // next_draw: "2020-07-08"
  //       });
  // }

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
          {/* {this.state.lottojackpot1} */}
        </AppBar>
      </div>
    );
  }
}
