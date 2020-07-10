import React from "react";
import {Container, Row, Col} from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
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

const styles = {
  root: {
    backgroundColor: "#231874",
    padding: "10px",
    fontFamily: "MOMCAKE-BOLD"
  },

  button: {
    marginLeft: "70%",
    fontFamily: "MOMCAKE-BOLD"
  }, 

  typography: {
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "20px"
  }

};

// const styles = theme => ({
//   root: {
//     backgroundColor: "red"
//   }
// });

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,  // flexgrow = div will grow to same size as window
//   },
//   title: {
//       flexGrow: 1,
//   },
//   color: {
//       backgroundColor: '#0F0D11'
//   }
// });

class Sitebar extends React.Component<acceptedProps> {

// export default class Sitebar extends React.Component<
//   acceptedProps,
//   valueTypes
// > {
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

    // const classes = useStyle;    

    return (
      <div >
        <AppBar style={styles.root} position="static">
          <Toolbar >
            {/* <Col md="6">  */}
              <Typography variant="h6" style={styles.typography} >
                <img width="70px" src={require('../../assests/DLlogo3.png')} alt="logo" />
              </Typography>
             {/* </Col>  */}
             {/* <Col style={styles.button} md="6">  */}
              <button style={styles.button} onClick={this.props.clickLogout}>Logout</button>
            {/* </Col> */}
          </Toolbar>
          {/* {this.state.lottojackpot1} */}
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Sitebar);