import React from "react";

// MATERIAL UI 
// import { withStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
// import SnackbarContent from '@material-ui/core/SnackbarContent';

// ANTD 
import { Button, notification } from "antd";

// STYLING
const styles = {
  navButton: {
    backgroundColor: "#4536b3",
    border: "2px solid #4536b3",
    fontFamily: "MOMCAKE-BOLD",
    color: "whitesmoke",
    fontSize: "22px",
    // text: "center"
  }
};

    // root: {
    //   padding: "10px",
    //   fontFamily: "MOMCAKE-BOLD",
    //   color: "black",
    //   fontSize: "20px",
    //   backgroundColor: "#f2f2f2"
    // },

    // header: {
    //     color: "#f2f2f2"
    // }


type acceptedProps = {
  // no token
};

type valueTypes = {
  // will match this.state 
    activity: string;
    type: string;
    participants: null;
};

export default class Bored extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      activity: "",
      type: "",
      participants: null,
    };
  }


  componentDidMount() {
    console.log("component mounted")

    fetch('http://www.boredapi.com/api/activity')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                activity: json.activity,
                type: json.type,
                participants: json.participants
            })
        });
}

    // ANTD NOTIFICATION  
    openNotification = () => {
        notification.open({
          message: 'Bored with the Lotto? Try a new activity!',
          description: (
            <div>
              <p>Activity: {this.state.activity}</p>
              <p>Type of activity: {this.state.type}</p>
              <p># of people: {this.state.participants}</p>
            </div>
          ),
              
          onClick: () => {
              console.log('Notification Clicked!');
          },
        });
    };    

  render() {
    return (
      
        <Button onClick={this.openNotification} style={styles.navButton}>BORED?</Button>
      
    );
  }
}


// export default withStyles(styles)(Bored);

{/* <h1 style={styles.header}>BORED API</h1>
                <SnackbarContent action={action} style={styles.root}
                    message={this.state.activity}
                    
                /> */}