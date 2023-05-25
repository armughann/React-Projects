import React from "react";
import ReactDOM from "react-dom";
import Quote from "./Components/Quote";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Quote />
  </Provider>,
  document.getElementById("root")
);
