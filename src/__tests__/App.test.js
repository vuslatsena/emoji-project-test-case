import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

// App Render test without crashing
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
