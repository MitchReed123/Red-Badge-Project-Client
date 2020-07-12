import React from "react";
import { Button, notification } from "antd";

type valueTypes = {
  shell: string;
  mixin: string;
  seasoning: string;
  condiment: string;
  baseLayer: string;
};

export default class Taco extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {
      shell: "",
      mixin: "",
      seasoning: "",
      condiment: "",
      baseLayer: "",
    };
  }

  //http://taco-randomizer.herokuapp.com/random/?full-taco=true
  //shell, mixin, seasoning, condiment, base_layer

  fetchData = () => {
    fetch("http://taco-randomizer.herokuapp.com/random/")
      .then((res) => res.json())
      .then((res) => {
        console.log("TACOS", res);
        this.setState({
          shell: res.shell.name,
          mixin: res.mixin.name,
          seasoning: res.seasoning.name,
          condiment: res.condiment.name,
          baseLayer: res.base_layer.name,
        });
        console.log(
          "TACO STATE",
          this.state.baseLayer,
          this.state.mixin,
          this.state.seasoning,
          this.state.condiment,
          this.state.shell
        );
      });
  };

  openNotification = () => {
    notification.open({
      message: "Taco Recipes",
      description: (
        <div>
          <>
            <p>{this.state.shell}</p>
            <p>{this.state.mixin}</p>
            <p>{this.state.seasoning}</p>
            <p>{this.state.condiment}</p>
            <p>{this.state.baseLayer}</p>
          </>
        </div>
      ),
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Button type="primary" onClick={this.openNotification}>
        TACOS
      </Button>
    );
  }
}
