import React from "react";
import { Button, notification } from "antd";

type valueTypes = {
  activity: string;
  type: string;
};

export default class Bored extends React.Component<{}, valueTypes> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activity: "",
      type: "",
    };
  }

  fetchData = () => {
    fetch("http://www.boredapi.com/api/activity/")
      .then((res) => res.json())
      .then((res) => {
        console.log("BORED", res);
        this.setState({
          activity: res.activity,
          type: res.type,
        });
      });
  };

  openNotification = () => {
    notification.open({
      message: "Bored API",
      description: (
        <div>
          <>
            <p>{this.state.activity}</p>
            <p>{this.state.type}</p>
          </>
        </div>
      ),
      onClick: () => {
        this.fetchData();
      },
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Button type="primary" onClick={this.openNotification}>
        Bored API
      </Button>
    );
  }
}
