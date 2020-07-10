//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React from "react";
import LottoCreate from "./lottoCreate";
// import LottoTable from "./lottoTable";
import LottoEdit from "./lottoEdit";
import { Row, Col, Table, Button } from "reactstrap";
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
export default class LottoIndex extends React.Component<
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
            <Button
              onClick={() => {
                this.editUpdateLotto(lotto);
                this.updateOn();
              }}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              onClick={() => {
                this.deleteLotto(lotto);
              }}
            >
              Delete
            </Button>
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
        Welcome Back {localStorage.getItem("username")} to your Lotto Page
      </h1>
    ) : localStorage.getItem("message") === "user created" ? (
      <h1 id="messages" style={{ textAlign: "center" }}>
        Welcome {localStorage.getItem("username")} to your Lottery Page
      </h1>
    ) : (
      "null"
    );
  }

  render() {
    return (
      <div>
        {this.Welcoming()}
        <LottoCreate
          token={this.props.token}
          fetchLottos={this.fetchLottos}
          // destinations={this.fetchLocos}
        />
        {/* <button onClick={this.handleClick}>Click Me</button> */}
        <h1>{this.state.random}</h1>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Lotto Number</th>
                  <th>Name of Lottery</th>
                  <th>Lottery Pot</th>
                  <th>Lotto location</th>
                </tr>
              </thead>
              <tbody>{this.lottoMapper()}</tbody>
            </Table>
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
