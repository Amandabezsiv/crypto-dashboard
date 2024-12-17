import React from "react";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div>
      <h1>
        <span className="live-indicator"></span> Live Crypto Dashboard
      </h1>
      <Dashboard />
    </div>
  );
};

export default App;
