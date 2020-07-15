import React from "react";
import { Button, notification } from "antd";


type valueTypes = {
  base_layer: string;
  condiment: string;
  mixin: string;
  seasoning: string;
  shell: string;
};

// STYLING
const styles = {
  navButton: {
    backgroundColor: "#fdb20d",
    border: "2px solid #fdb20d",
    fontFamily: "MOMCAKE-BOLD",
    color: "whitesmoke",
    fontSize: "22px",
    // text: "center"
  }
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
      <Button onClick={this.openNotification} style={styles.navButton}>
        TACOS
      </Button>
    );
  }
}

