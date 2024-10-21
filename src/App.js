import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestManager from "./pages/requestManager/RequestManager";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/user" component={User} />
          <Route path="/contractManager" component={ContractManager} /> */}
        <Route path="/requestManager" component={RequestManager} />
        <Route path="/" exact></Route>
      </Routes>
    </Router>
  );
};

export default App;
