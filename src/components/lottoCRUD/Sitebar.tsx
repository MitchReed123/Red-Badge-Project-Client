import React from "react";
import {Container, Row, Col} from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

type acceptedProps = {
  clickLogout: any;
};

const styles = {
  root: {
    backgroundColor: "#000240",
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

    // const classes = useStyle;    

    return (
      <div >
        <AppBar style={styles.root} position="static">
          <Toolbar >
            {/* <Col md="6">  */}
              <Typography variant="h6" style={styles.typography} >
                Logo Here 
              </Typography>
             {/* </Col>  */}
             {/* <Col style={styles.button} md="6">  */}
              <button style={styles.button} onClick={this.props.clickLogout}>Logout</button>
            {/* </Col> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Sitebar);