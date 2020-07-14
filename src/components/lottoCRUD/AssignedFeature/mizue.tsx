import React from "react";
import { Button, notification } from "antd";

type valueTypes = {
  base_layer: string;
  condiment: string;
  mixin: string;
  seasoning: string;
  shell: string;
};

export default class Taco extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {
      base_layer: "",
      condiment: "",
      mixin: "",
      seasoning: "",
      shell: "",
    };
  }

  //http://taco-randomizer.herokuapp.com/random/
  //shell, mixin, seasoning, condiment, base_layer

  fetchTaco = () => {
    fetch(`http://taco-randomizer.herokuapp.com/random/`)
      .then((res) => res.json())
      .then((tacoData) => {
        console.log("TACOS",tacoData);
        this.setState({
          base_layer: tacoData.base_layer.name,
          condiment: tacoData.condiment.name,
          mixin: tacoData.mixin.name,
          seasoning: tacoData.seasoning.name,
          shell: tacoData.shell.name,  
        });
      });
  };

  openNotification = () => {
    notification.open({
      message: "Taco Recipes",
      description: (
        <div>
          <>
            <p>Shell/ {this.state.shell}</p>
            <p>Mixin/ {this.state.mixin}</p>
            <p>Seasoning/ {this.state.seasoning}</p>
            <p>Condiment/ {this.state.condiment}</p>
            <p>Base Layer/ {this.state.base_layer}</p>
          </>
        </div>
      ),
    });
  };

  componentDidMount() {
    this.fetchTaco();
  }

  render() {
    return (
      <Button type="primary" onClick={this.openNotification}>
        TACO TACOS 
      </Button>
    );
  }
}
