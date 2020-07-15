//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React from "react";
import LottoCreate from "./lottoCreate";
// import LottoTable from "./lottoTable";
import LottoEdit from "./lottoEdit";
import { Container, Row, Col, Button } from "reactstrap";
import "./lottoIndex.css";
import APIURL from "../../helpers/environment";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/DeleteSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";

import Tooltip from "@material-ui/core/Tooltip";

type acceptedProps = {
  token: string | any;
};
type valueTypes = {
  lottoNum: number;
  nameOfLotto: string;
  lottoPot: string;
  location: [];
  dataTable: [];
  setUpdateLotto: {};
  setUpdateActive: boolean;
  random: string;
  locodatatable: [];
  lottoEmpty: any;
  hyphen: string;
};

//STYLING
const styles = {
  welcome: {
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "70px",
    marginTop: "40px",
    marginBottom: "40px",
    marginLeft: "35%",
    marginRight: "35%",
    color: "#f2f2f2",
    alignContent: "center",
  },

  root: {
    width: "100%",
    backgroundColor: "rgba(69, 54, 179, 0.8)",
    border: "10px solid rgba(69, 54, 179, 0.8)",
  },

  container: {
    maxHeight: "auto",
    backgroundColor: "#f2f2f2",
    // backgroundColor: "#4536b3",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
  },

  tableHeader: {
    width: "auto",
    backgroundColor: "#4536b3",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
    color: "#f2f2f2",
  },

  newLotto: {
    backgroundColor: "#4536b3",
    width: "100%",
    // height: "700px",
    marginRight: "30%",
    marginLeft: "30%",
  },

  toolTip: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: "shadows[1]",
    fontSize: "11",
  },
};

// MATERIAL UI FIXED TABLE
interface Column {
  id:
    | "lottoNum"
    | "nameOfLotto"
    | "lottoPot"
    | "location"
    | "update"
    | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "lottoNum", label: "Lottery Number", minWidth: 100 },
  { id: "nameOfLotto", label: "Name of Lottery", minWidth: 100 },
  { id: "lottoPot", label: "Lottery Pot Amount", minWidth: 100 },
  { id: "location", label: "Lottery Location", minWidth: 100 },
  { id: "update", label: "Update", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

class LottoIndex extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      lottoNum: 0,
      nameOfLotto: "",
      lottoPot: "",
      location: [],
      dataTable: [],
      setUpdateLotto: {},
      locodatatable: [],
      setUpdateActive: false,
      random: "",
      lottoEmpty: undefined,
      hyphen: "-",
      //owner_id: '',
      //userId: '', //???
    };
  }

  editUpdateLotto = (lotto: any) => {
    console.log(lotto);
    this.setState({ setUpdateLotto: lotto });
  };

  updateOn = () => {
    this.setState({ setUpdateActive: true });
  };

  updateOff = () => {
    this.setState({ setUpdateActive: false });
  };

  fetchLottos = () => {
    fetch(`${APIURL}/lotto/`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((lottoData) => {
        console.log("Lotto Data", lottoData.lotteries);
        this.setState({
          dataTable: lottoData.lotteries,
        });
        console.log("Lottery State Variable", this.state.dataTable);
      });
  };
  //this needs to be fixed, it wont work at all
  deleteLotto = (lotto: any) => {
    fetch(`${APIURL}/lotto/${lotto.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: this.props.token,
      }),
    }).then(() => this.fetchLottos());
  };

  min = 1;
  max = 49;

  // addZero() {
  //   return (this.state.random < "10" ? "0" : "") + this.state.random;
  // }

  randomNum = () => {
    return (
      Math.floor(1 + Math.random() * 45) +
      "-" +
      Math.floor(1 + Math.random() * 45) +
      "-" +
      Math.floor(1 + Math.random() * 45) +
      "-" +
      Math.floor(1 + Math.random() * 45) +
      "-" +
      Math.floor(1 + Math.random() * 45) +
      "-" +
      Math.floor(1 + Math.random() * 45)
    );
  };

  handleClick = () => {
    this.setState({
      random:
        // Math.floor(1 + Math.random() * 45) +
        // "-" +
        // Math.floor(1 + Math.random() * 45) +
        // "-" +
        // Math.floor(1 + Math.random() * 45) +
        // "-" +
        // Math.floor(1 + Math.random() * 45) +
        // "-" +
        // Math.floor(1 + Math.random() * 45) +
        // "-" +
        // Math.floor(1 + Math.random() * 45),
        this.randomNum(),
    });
  };

  lottoMapper = () => {
    return this.state.dataTable.map((lotto: any, index) => {
      return (
        <tr key={index}>
          <td>{lotto.lottoNum}</td>
          <td>{lotto.nameOfLotto}</td>
          <td>{lotto.lottoPot}</td>
          <td>{lotto.location}</td>
          <td>

          <Tooltip id="tool-tip" title="Update Lotto Info" arrow placement="bottom" >
            <EditSharpIcon fontSize="large"
              onClick={() => {
                this.editUpdateLotto(lotto);
                this.updateOn();
              }}
            />
          </Tooltip>  

          </td>
          <td>
            <Tooltip
              id="tool-tip"
              title="Delete Lotto"
              arrow
              placement="bottom"
            >
              <DeleteIcon
                fontSize="large"
                onClick={() => {
                  this.deleteLotto(lotto);
                }}
              />
            </Tooltip>
          </td>
        </tr>
      );
    });
  };
  componentWillMount() {
    console.log("will mount");
  }
  componentDidMount() {
    this.fetchLottos();
    this.lottoMapper();
  }

  Welcoming() {
    return localStorage.getItem("message") === null ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Sign Up or Login to see your Lottos
      </h1>
    ) : localStorage.getItem("message") === "user succesfully logged in" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome Back {localStorage.getItem("username")}!
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome {localStorage.getItem("username")} to your Lottery Profile!
      </h1>
    ) : (
      "null"
    );
  }

  render() {
    return (
      <div>
        <Row>
          <div style={styles.welcome}>{this.Welcoming()}</div>
        </Row>
        <Row>
          <Col md="7">
            <h1 className="table-header">Your Lottery Numbers</h1>
            {/* MATERIAL UI FIXED TABLE */}
            <Paper style={styles.root}>
              <TableContainer style={styles.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          // style={{ minWidth: column.minWidth }}
                          style={styles.tableHeader}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.lottoMapper()}</TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Col>
          <Col md="5">
            <LottoCreate
              token={this.props.token}
              fetchLottos={this.fetchLottos}
              // destinations={this.fetchLocos}
            />
            {/* <button onClick={this.handleClick}>Click Me</button> */}
            <h1>{this.state.random}</h1>
          </Col>
        </Row>

        {this.state.setUpdateActive ? (
          <LottoEdit
            updateOff={this.updateOff}
            token={this.props.token}
            fetchLottos={this.fetchLottos}
            setUpdateLotto={this.state.setUpdateLotto}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LottoIndex);
