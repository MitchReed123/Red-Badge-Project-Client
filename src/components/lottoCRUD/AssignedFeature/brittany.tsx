import React from "react";
import { Button, notification } from "antd";

type valueTypes = {};

export default class Bored extends React.Component<{}, valueTypes> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Button>api results</Button>
      </div>
    );
  }
}
