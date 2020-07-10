import { Button, notification } from "antd";
import React from "react";

type acceptedProps = {};
type valueTypes = {
  LTCBase: string;
  LTCTarget: string;
  LTCPrice: number | any;
  LTCChange: string;
  BTCBase: string;
  BTCTarget: string;
  BTCPrice: number | any;
  BTCChange: string;
};
export default class App extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      LTCBase: "",
      LTCTarget: "",
      LTCPrice: 0,
      LTCChange: "",
      BTCBase: "",
      BTCTarget: "",
      BTCPrice: 0,
      BTCChange: "",
    };
  }
  fetchData = () => {
    fetch("https://api.cryptonator.com/api/ticker/ltc-usd/")
      .then((res) => res.json())
      .then((res) => {
        console.log("Testing", res.ticker.base);
        this.setState({
          LTCBase: res.ticker.base,
          LTCTarget: res.ticker.target,
          LTCPrice: Math.round(res.ticker.price).toLocaleString("en"),
          LTCChange: res.ticker.change,
        });
        console.log("Will it work", this.state.LTCBase);
      });
  };

  fetchBTC = () => {
    fetch("https://api.cryptonator.com/api/ticker/btc-usd/")
      .then((res) => res.json())
      .then((res) => {
        console.log("BTC TEST", res.ticker.base);
        this.setState({
          BTCBase: res.ticker.base,
          BTCPrice: Math.round(res.ticker.price).toLocaleString("en"),
          BTCTarget: res.ticker.target,
          BTCChange: res.ticker.change,
        });
        console.log("BTC STATE", this.state.BTCBase);
      });
  };
  componentDidMount() {
    this.fetchData();
    this.fetchBTC();
  }

  LTCChange = () => {
    return this.state.LTCChange.includes("-") ? (
      <p style={{ color: "red" }}>{this.state.LTCChange}</p>
    ) : (
      <p style={{ color: "green" }}>{this.state.LTCChange}</p>
    );
  };

  BTCChange = () => {
    return this.state.BTCChange.includes("-") ? (
      <p style={{ color: "red" }}>{this.state.BTCChange}</p>
    ) : (
      <p style={{ color: "green" }}>{this.state.BTCChange}</p>
    );
  };

  openNotification = () => {
    notification.open({
      message: "Crypto Pricing LTC/BTC",
      description: (
        <div>
          <>
            <ul className="LiteCoin">
              <li>{this.state.LTCBase}(LiteCoin)</li>
              <li>${this.state.LTCPrice}</li>
              <li>{this.state.LTCTarget}</li>
              <li>{this.LTCChange()}</li>
            </ul>
          </>
          <>
            <ul className="BitCoin">
              <li>{this.state.BTCBase}(BitCoin)</li>
              <li>${this.state.BTCPrice}</li>
              <li>{this.state.BTCTarget}</li>
              <li>{this.BTCChange()}</li>
            </ul>
          </>
        </div>
      ),
      onClick: () => {
        this.fetchData();
      },
    });
  };
  render() {
    return (
      <Button type="primary" onClick={this.openNotification}>
        LTC/BTC
      </Button>
    );
  }
}
