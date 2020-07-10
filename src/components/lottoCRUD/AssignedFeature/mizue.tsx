import React from "react";
import { Button, notification } from "antd";

type valueTypes = {};

export default class Taco extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {};
  }

  //http://taco-randomizer.herokuapp.com/random/?full-taco=true

  render() {
    return (
      <div>
        <Button>API results here</Button>
      </div>
    );
  }
}
