// import React from 'react';
// import "./lottoIndex.css";

// // import Sitebar from "./components/lottoCRUD/Sitebar";


// type AcceptedProps = {
//     token: string | any;
// }

// export default class LottoIndex extends React.Component<AcceptedProps> { 
//     constructor(props: AcceptedProps){
//         super(props);
//     }
//     render(){
//         return(
//             <div>
//                           {/* <Sitebar clickLogout={this.clearToken} /> */}

//                 <h1>lotto</h1>
//             </div>
//         )
//     }
//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React, { Component, useState, useEffect } from "react";
import LottoCreate from "./lottoCreate";
import LottoTable from "./lottoTable";
import LottoEdit from "./lottoEdit";
import { Container, Row, Col, Button } from "reactstrap";
import "./lottoIndex.css";



import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import Tooltip from '@material-ui/core/Tooltip';


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
  root: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    border: "10px solid #4536b3"
  },

  container: {
    maxHeight: "500px",
    backgroundColor: "#f2f2f2",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px"
  },

  tableHeader: {
    width: "auto",
    backgroundColor: "#4536b3",
    fontFamily: "MOMCAKE-BOLD",
    fontSize: "30px",
    color: "#f2f2f2"
  },

  newLotto: {
    backgroundColor: "#4536b3",
    width: "100%",
    // height: "500px",
    marginRight: "30%",
    marginLeft: "30%", 
  },

  toolTip: {
    backgroundColor: "white",
    color: 'rgba(0, 0, 0, 0.87)',
    // boxShadow: "shadows[1]",
    fontSize: "11"
  }

};

// MATERIAL UI FIXED TABLE
interface Column {
  id: 'lottoNum' | 'nameOfLotto' | 'lottoPot' | 'location' | 'update' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'lottoNum', label: 'Lottery Number', minWidth: 100 },
  { id: 'nameOfLotto', label: 'Name of Lottery', minWidth: 100 },
  { id: 'lottoPot', label: 'Lottery Pot', minWidth: 100 },
  { id: 'location', label: 'Lottery Location', minWidth: 100 },
  { id: 'update', label: 'Update', minWidth: 100 },
  { id: 'delete', label: 'Delete', minWidth: 100 },

];


class LottoIndex extends React.Component<
  acceptedProps,
  valueTypes
> {
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
    fetch("http://localhost:3000/lotto/", {
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
    fetch(`http://localhost:3000/lotto/${lotto.id}`, {
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
          <Tooltip id="tool-tip" title="Update User Info" arrow placement="bottom" style={styles.toolTip}>
            <EditSharpIcon fontSize="large"
              onClick={() => {
                this.editUpdateLotto(lotto);
                this.updateOn();
              }}
            />
          </Tooltip>  
          </td>
          <td>
          <Tooltip title="Delete User" >
            <DeleteIcon fontSize="large" 
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
  render() {
    return (
      <div>
        <Row>
          {/* <Col> */}
              <div style={styles.newLotto}>
                <h1>Add a New Lottery Number!</h1>
                <LottoCreate
                  token={this.props.token}
                  fetchLottos={this.fetchLottos}
                  // destinations={this.fetchLocos}
                />
                <button onClick={this.handleClick}>Click Me</button>
                <h1>{this.state.random}</h1>
              </div>
            {/* </Col> */}
        </Row>
        <Row>
          <Col>
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
                  <TableBody>
                    {this.lottoMapper()}
                    {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              /> */}
            </Paper>
            {/* <Table>
              <thead>
                <tr>
                  <th>Lotto Number</th>
                  <th>Name of Lottery</th>
                  <th>Lottery Pot</th>
                  <th>Lotto location</th>
                </tr>
              </thead>
              <tbody>{this.lottoMapper()}</tbody>
            </Table> */}
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