import React from "react";
import "./App.css";
import LottoIndex from './components/lottoCRUD/lottoIndex';
import Auth from './components/AuthInfo/Auth';
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

    const protectedViews = () => {
      return (sessionToken === localStorage.getItem('token')? <LottoIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
    }
   
    return (
      <Router>
        {/* <nav>
          <Link to="/"></Link>
        </nav>
        <Switch>
          <Route exact path="/" />
        </Switch> */}
        {protectedViews()}

      </Router>
    );
  }
}

// export default App;
