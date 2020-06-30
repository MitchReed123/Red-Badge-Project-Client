import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// const App: React.FunctionComponent = () => {
//   return (
//     <div className="App">
//       <Router>

//       </Router>
//     </div>
//   );
// };

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/"></Link>
        </nav>
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
    );
  }
}

// export default App;
